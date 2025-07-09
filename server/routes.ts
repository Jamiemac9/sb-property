import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCallbackRequestSchema, insertQuoteRequestSchema } from "@shared/schema";
import { generateAIResponse } from "./ai-chat";
import { z } from "zod";
import multer from "multer";
import { Client } from "@replit/object-storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Configure multer for file uploads
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed'));
      }
    },
  });

  // Initialize Object Storage client with enhanced error handling
  let objectStorage: Client | null = null;
  
  // Non-blocking initialization function
  const initializeObjectStorage = () => {
    try {
      // Only initialize if we have the proper environment setup for Object Storage
      if (process.env.REPLIT_DEPLOYMENT || process.env.REPLIT_STORAGE_BUCKET) {
        objectStorage = new Client();
        console.log("Object Storage initialized successfully");
      } else {
        console.log("Object Storage not configured in development environment, using base64 fallback");
      }
    } catch (error) {
      console.warn("Object Storage not available, falling back to base64 encoding:", error instanceof Error ? error.message : 'Unknown error');
      objectStorage = null; // Ensure it's null on error
    }
  };
  
  // Initialize Object Storage without blocking server startup
  initializeObjectStorage();

  // Health check endpoint for deployment monitoring
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "healthy", 
      timestamp: new Date().toISOString(),
      objectStorage: objectStorage ? "available" : "unavailable",
      environment: process.env.NODE_ENV || "development"
    });
  });

  // Image upload endpoint with enhanced error handling
  app.post("/api/upload-image", upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, error: "No image file provided" });
      }

      const filename = req.body.filename || `image_${Date.now()}_${req.file.originalname}`;
      
      if (objectStorage) {
        try {
          // Upload to Object Storage with error handling
          await objectStorage.uploadFromBytes(filename, req.file.buffer);
          
          // Generate a public URL
          const publicUrl = `${req.protocol}://${req.get('host')}/api/image/${filename}`;
          
          res.json({ 
            success: true, 
            url: publicUrl,
            filename: filename 
          });
        } catch (storageError) {
          console.warn("Object Storage upload failed, falling back to base64:", storageError);
          // Fallback to base64 if Object Storage fails
          const base64 = req.file.buffer.toString('base64');
          const dataUrl = `data:${req.file.mimetype};base64,${base64}`;
          
          res.json({ 
            success: true, 
            url: dataUrl,
            filename: filename,
            fallback: true
          });
        }
      } else {
        // Fallback: convert to base64 for direct WhatsApp sharing
        const base64 = req.file.buffer.toString('base64');
        const dataUrl = `data:${req.file.mimetype};base64,${base64}`;
        
        res.json({ 
          success: true, 
          url: dataUrl,
          filename: filename,
          fallback: true
        });
      }
    } catch (error) {
      console.error("Image upload error:", error);
      res.status(500).json({ success: false, error: "Image upload failed" });
    }
  });

  // Image retrieval endpoint with enhanced error handling
  app.get("/api/image/:filename", async (req, res) => {
    try {
      if (!objectStorage) {
        return res.status(503).json({ 
          success: false, 
          error: "Image service is temporarily unavailable" 
        });
      }

      const { filename } = req.params;
      
      try {
        // Download from Object Storage with error handling
        const imageBuffer = await objectStorage.downloadAsBytes(filename);
        
        // Set appropriate headers
        res.setHeader('Content-Type', 'image/jpeg'); // You might want to store and retrieve the original mime type
        res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
        
        res.send(imageBuffer);
      } catch (storageError) {
        console.error("Object Storage retrieval failed:", storageError);
        res.status(404).json({ 
          success: false, 
          error: "Image not found or storage service unavailable" 
        });
      }
    } catch (error) {
      console.error("Image retrieval error:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  // Address lookup endpoint
  app.get("/api/address-lookup/:postcode", async (req, res) => {
    try {
      const { postcode } = req.params;
      const cleanPostcode = postcode.replace(/\s/g, '').toUpperCase();

      // Try getAddress.io first (demo key has limited usage)
      try {
        const response = await fetch(
          `https://api.getAddress.io/find/${cleanPostcode}?api-key=demo&format=json`
        );

        if (response.ok) {
          const data = await response.json();
          if (data.addresses && data.addresses.length > 0) {
            const formattedAddresses = data.addresses.map((addr: string) => `${addr}, ${cleanPostcode}`);
            return res.json({ 
              success: true, 
              addresses: formattedAddresses,
              source: 'getAddress'
            });
          }
        }
      } catch (error) {
        console.log("getAddress.io failed, trying postcodes.io");
      }

      // Fallback to postcodes.io for validation
      const postcodeResponse = await fetch(`https://api.postcodes.io/postcodes/${cleanPostcode}`);

      if (postcodeResponse.ok) {
        const postcodeData = await postcodeResponse.json();
        if (postcodeData.result) {
          const baseAddress = `${postcodeData.result.admin_district}, ${postcodeData.result.admin_county}, ${cleanPostcode}`;
          return res.json({ 
            success: true, 
            addresses: [baseAddress],
            validated: true,
            source: 'postcodes.io'
          });
        }
      }

      res.json({ success: false, error: "Postcode not found" });
    } catch (error) {
      console.error("Address lookup error:", error);
      res.status(500).json({ success: false, error: "Address lookup failed" });
    }
  });

  // Callback request endpoint
  app.post("/api/callback", async (req, res) => {
    try {
      const validatedData = insertCallbackRequestSchema.parse(req.body);
      const callbackRequest = await storage.createCallbackRequest(validatedData);

      res.status(201).json({ 
        success: true, 
        message: "Callback request submitted successfully",
        id: callbackRequest.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid request data",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Get all callback requests (for admin purposes)
  app.get("/api/callback", async (req, res) => {
    try {
      const requests = await storage.getCallbackRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch callback requests" 
      });
    }
  });

  // Quote request endpoint
  app.post("/api/quote", async (req, res) => {
    try {
      const validatedData = insertQuoteRequestSchema.parse(req.body);
      const quoteRequest = await storage.createQuoteRequest(validatedData);

      res.status(201).json({ 
        success: true, 
        message: "Quote request submitted successfully",
        id: quoteRequest.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid request data",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Get all quote requests (for admin purposes)
  app.get("/api/quote", async (req, res) => {
    try {
      const requests = await storage.getQuoteRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch quote requests" 
      });
    }
  });

  // AI Chat endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid message format" 
        });
      }

      // For now, we'll use enhanced rule-based responses
      // You can later integrate with OpenAI, Claude, or other AI APIs
      const response = await generateAIResponse(message);

      res.json({ 
        success: true, 
        response: response 
      });
    } catch (error) {
      console.error('AI Chat error:', error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to process chat message" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}