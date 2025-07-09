import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCallbackRequestSchema, insertQuoteRequestSchema } from "@shared/schema";
import { generateAIResponse } from "./ai-chat";
import { z } from "zod";
import multer from "multer";

// Import Object Storage with production-safe error handling
let Client: any = null;
try {
  const objectStorageModule = await import("@replit/object-storage");
  Client = objectStorageModule.Client;
} catch (error) {
  console.warn("Object Storage module not available in this environment, using fallback mode");
  Client = null;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Production-safe route registration with comprehensive error handling
  console.log('Registering routes for environment:', process.env.NODE_ENV || 'development');
  
  try {
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

    // Server startup status tracking
    let serverReady = false;
    
    // Middleware to ensure server is fully ready before handling requests
    app.use((req, res, next) => {
      if (!serverReady && !req.path.includes('/health')) {
        return res.status(503).json({ 
          error: "Server is starting up", 
          message: "Please wait a moment and try again" 
        });
      }
      next();
    });

  // Initialize Object Storage client with production-safe error handling
  let objectStorage: any = null;
  let objectStorageInitialized = false;
  
  // Production-safe asynchronous initialization function
  const initializeObjectStorage = async () => {
    // Skip if already initialized or Client is not available
    if (objectStorageInitialized || !Client) {
      return;
    }
    
    try {
      // Check for production environment variables first
      const isProduction = process.env.NODE_ENV === 'production';
      const hasReplitDeployment = process.env.REPLIT_DEPLOYMENT === 'true';
      const hasStorageBucket = process.env.REPLIT_STORAGE_BUCKET;
      
      // Only initialize if we have the proper environment setup for Object Storage
      if (isProduction && (hasReplitDeployment || hasStorageBucket)) {
        objectStorage = new Client();
        console.log("Object Storage initialized successfully for production");
        objectStorageInitialized = true;
      } else if (!isProduction && (hasReplitDeployment || hasStorageBucket)) {
        objectStorage = new Client();
        console.log("Object Storage initialized successfully for development");
        objectStorageInitialized = true;
      } else {
        console.log("Object Storage not configured, using base64 fallback");
        console.log(`Environment: ${process.env.NODE_ENV || 'development'}, Deployment: ${hasReplitDeployment}, Bucket: ${!!hasStorageBucket}`);
      }
    } catch (error) {
      console.warn("Object Storage initialization failed, falling back to base64 encoding:", error instanceof Error ? error.message : 'Unknown error');
      objectStorage = null; // Ensure it's null on error
      
      // In production, don't let this error crash the server
      if (process.env.NODE_ENV === 'production') {
        console.warn("Continuing server startup without Object Storage in production...");
      }
    }
  };
  
  // Initialize Object Storage asynchronously without blocking server startup
  if (Client) {
    setTimeout(initializeObjectStorage, 1000); // Delay initialization to ensure server is ready
  }

  // Health check endpoint for deployment monitoring
  app.get("/api/health", (req, res) => {
    const healthData = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
      objectStorage: {
        available: objectStorage ? "available" : "unavailable",
        hasReplitDeployment: process.env.REPLIT_DEPLOYMENT === 'true',
        hasStorageBucket: !!process.env.REPLIT_STORAGE_BUCKET
      },
      server: {
        port: process.env.PORT || 5000,
        host: "0.0.0.0",
        uptime: process.uptime()
      },
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + 'MB',
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + 'MB'
      }
    };
    
    res.json(healthData);
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
      // Enhanced error handling for production
      const errorMessage = process.env.NODE_ENV === 'production' 
        ? "Failed to upload image" 
        : `Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`;
      
      res.status(500).json({ 
        success: false, 
        error: errorMessage 
      });
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
    
    // Mark server as ready after all routes are registered
    setTimeout(() => {
      serverReady = true;
      console.log("Server initialization complete - ready to accept requests");
    }, 100);
    
    return httpServer;
    
  } catch (error) {
    console.error('Fatal error during routes registration:', error);
    // In production, don't crash the entire application
    if (process.env.NODE_ENV === 'production') {
      console.error('Routes registration failed in production. Creating minimal server...');
      
      // Create a minimal server that can at least respond to health checks
      const httpServer = createServer(app);
      
      // Basic health check for failed deployment
      app.get("/api/health", (req, res) => {
        res.json({ 
          status: "degraded", 
          timestamp: new Date().toISOString(),
          error: "Routes registration failed",
          environment: process.env.NODE_ENV || "development"
        });
      });
      
      // Default error response for all other routes
      app.use("*", (req, res) => {
        res.status(503).json({
          error: "Service temporarily unavailable",
          message: "Server is experiencing initialization issues"
        });
      });
      
      return httpServer;
    } else {
      throw error;
    }
  }
}