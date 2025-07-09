import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCallbackRequestSchema, insertQuoteRequestSchema } from "@shared/schema";
import { generateAIResponse } from "./ai-chat";
import { z } from "zod";
import multer from "multer";

// Production-safe route registration without Object Storage dependency
export async function registerProductionSafeRoutes(app: Express): Promise<Server> {
  console.log('Registering production-safe routes...');
  
  // Configure multer for file uploads (base64 only in production)
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

  // Health check endpoint - always available
  app.get("/api/health", (req, res) => {
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
      objectStorage: {
        available: "unavailable",
        note: "Using base64 fallback in production-safe mode"
      },
      server: {
        port: process.env.PORT || 5000,
        host: "0.0.0.0",
        uptime: process.uptime()
      }
    });
  });

  // Image upload endpoint - production-safe with base64 fallback only
  app.post("/api/upload-image", upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, error: "No image file provided" });
      }

      const filename = req.body.filename || `image_${Date.now()}_${req.file.originalname}`;
      
      // Always use base64 in production-safe mode
      const base64 = req.file.buffer.toString('base64');
      const dataUrl = `data:${req.file.mimetype};base64,${base64}`;
      
      res.json({ 
        success: true, 
        url: dataUrl,
        filename: filename,
        fallback: true,
        note: "Production-safe mode: using base64 encoding"
      });
    } catch (error) {
      console.error("Image upload error:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to upload image" 
      });
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
              source: "getAddress.io"
            });
          }
        }
      } catch (error) {
        console.warn("getAddress.io API failed:", error);
      }

      // Fallback to postcodes.io
      try {
        const response = await fetch(`https://api.postcodes.io/postcodes/${cleanPostcode}`);
        if (response.ok) {
          const data = await response.json();
          if (data.result) {
            const result = data.result;
            const address = [
              result.admin_district,
              result.admin_county,
              result.country,
              cleanPostcode
            ].filter(Boolean).join(', ');
            
            return res.json({ 
              success: true, 
              addresses: [address],
              source: "postcodes.io"
            });
          }
        }
      } catch (error) {
        console.warn("postcodes.io API failed:", error);
      }

      // If all APIs fail, return error
      res.status(404).json({ 
        success: false, 
        error: "Postcode not found or service unavailable" 
      });

    } catch (error) {
      console.error("Address lookup error:", error);
      res.status(500).json({ 
        success: false, 
        error: "Internal server error" 
      });
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
        console.error("Callback request error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
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
        console.error("Quote request error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
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

  // Get requests endpoints (for admin purposes)
  app.get("/api/callback", async (req, res) => {
    try {
      const requests = await storage.getCallbackRequests();
      res.json(requests);
    } catch (error) {
      console.error("Get callback requests error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch callback requests" 
      });
    }
  });

  app.get("/api/quote", async (req, res) => {
    try {
      const requests = await storage.getQuoteRequests();
      res.json(requests);
    } catch (error) {
      console.error("Get quote requests error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch quote requests" 
      });
    }
  });

  const httpServer = createServer(app);
  console.log("Production-safe routes registered successfully");
  return httpServer;
}