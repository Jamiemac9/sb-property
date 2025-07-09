import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCallbackRequestSchema, insertQuoteRequestSchema } from "@shared/schema";
import { generateAIResponse } from "./ai-chat";
import { z } from "zod";
import multer from "multer";

// Import Object Storage with production-safe error handling
let Client: any = null;
let objectStorageAvailable = false;

// Completely isolate Object Storage import to prevent crashes
const initializeObjectStorageModule = async () => {
  try {
    // Enhanced production environment detection
    const isProduction = process.env.NODE_ENV === 'production';
    const hasReplitDeployment = process.env.REPLIT_DEPLOYMENT === 'true';
    const hasStorageBucket = !!process.env.REPLIT_STORAGE_BUCKET;
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    // Only attempt import if we're in a proper Replit environment
    if (hasReplitDeployment || hasStorageBucket || isDevelopment) {
      console.log(`Attempting Object Storage import. Environment: ${process.env.NODE_ENV}, Deployment: ${hasReplitDeployment}, Bucket: ${hasStorageBucket}`);
      
      const objectStorageModule = await import("@replit/object-storage");
      Client = objectStorageModule.Client;
      objectStorageAvailable = true;
      console.log("Object Storage module loaded successfully");
    } else {
      console.log("Object Storage module not needed in this environment - using fallback mode");
      Client = null;
      objectStorageAvailable = false;
    }
  } catch (error) {
    console.warn("Object Storage module not available, using fallback mode:", error instanceof Error ? error.message : 'Unknown error');
    Client = null;
    objectStorageAvailable = false;
    
    // In production, this should not cause server failure
    if (process.env.NODE_ENV === 'production') {
      console.log("Production deployment continuing with base64 fallback for image handling");
    }
  }
};

// Initialize module asynchronously and non-blocking with retry mechanism
const initializeWithRetry = async (maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await initializeObjectStorageModule();
      break;
    } catch (error) {
      console.warn(`Object Storage initialization attempt ${i + 1} failed:`, error);
      if (i === maxRetries - 1) {
        console.log("All Object Storage initialization attempts failed, continuing with fallback");
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
      }
    }
  }
};

// Initialize module with delay and retry mechanism
setTimeout(initializeWithRetry, 100);

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
      console.log("Object Storage initialization skipped - already initialized or Client unavailable");
      return;
    }
    
    try {
      // Check for production environment variables first
      const isProduction = process.env.NODE_ENV === 'production';
      const hasReplitDeployment = process.env.REPLIT_DEPLOYMENT === 'true';
      const hasStorageBucket = process.env.REPLIT_STORAGE_BUCKET;
      
      console.log(`Object Storage initialization attempt - Environment: ${process.env.NODE_ENV || 'development'}, Deployment: ${hasReplitDeployment}, Bucket: ${!!hasStorageBucket}`);
      
      // Only initialize if we have the proper environment setup for Object Storage
      if ((isProduction && (hasReplitDeployment || hasStorageBucket)) || 
          (!isProduction && (hasReplitDeployment || hasStorageBucket))) {
        
        // Wrap Client initialization in try-catch to prevent crashes
        try {
          objectStorage = new Client();
          console.log(`Object Storage initialized successfully for ${isProduction ? 'production' : 'development'}`);
          objectStorageInitialized = true;
        } catch (clientError) {
          console.warn("Object Storage Client creation failed:", clientError instanceof Error ? clientError.message : 'Unknown error');
          objectStorage = null;
          objectStorageInitialized = false;
        }
      } else {
        console.log("Object Storage not configured, using base64 fallback");
        console.log(`Environment: ${process.env.NODE_ENV || 'development'}, Deployment: ${hasReplitDeployment}, Bucket: ${!!hasStorageBucket}`);
        objectStorage = null;
        objectStorageInitialized = false;
      }
    } catch (error) {
      console.warn("Object Storage initialization failed, falling back to base64 encoding:", error instanceof Error ? error.message : 'Unknown error');
      objectStorage = null; // Ensure it's null on error
      objectStorageInitialized = false;
      
      // In production, don't let this error crash the server
      if (process.env.NODE_ENV === 'production') {
        console.warn("Continuing server startup without Object Storage in production...");
      }
    }
  };
  
  // Initialize Object Storage asynchronously without blocking server startup
  setTimeout(async () => {
    if (objectStorageAvailable && Client) {
      await initializeObjectStorage();
    }
  }, 2000); // Delay initialization to ensure server is ready

  // Health check endpoint for deployment monitoring
  app.get("/api/health", (req, res) => {
    try {
      const healthData = {
        status: "healthy",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development",
        objectStorage: {
          available: objectStorage ? "available" : "unavailable",
          initialized: objectStorageInitialized,
          moduleLoaded: objectStorageAvailable,
          hasReplitDeployment: process.env.REPLIT_DEPLOYMENT === 'true',
          hasStorageBucket: !!process.env.REPLIT_STORAGE_BUCKET
        },
        server: {
          port: process.env.PORT || 5000,
          host: "0.0.0.0",
          uptime: process.uptime(),
          ready: serverReady
        },
        memory: {
          used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + 'MB',
          total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + 'MB',
          rss: Math.round(process.memoryUsage().rss / 1024 / 1024) + 'MB'
        },
        deployment: {
          version: process.env.npm_package_version || "unknown",
          nodeVersion: process.version,
          platform: process.platform
        }
      };
      
      res.json(healthData);
    } catch (error) {
      console.error("Health check error:", error);
      res.status(500).json({
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: "Health check failed",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
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

  // Address lookup endpoint with enhanced error handling
  app.get("/api/address-lookup/:postcode", async (req, res) => {
    try {
      const { postcode } = req.params;
      
      // Input validation
      if (!postcode || postcode.length < 5) {
        return res.status(400).json({ 
          success: false, 
          error: "Invalid postcode format" 
        });
      }
      
      const cleanPostcode = postcode.replace(/\s/g, '').toUpperCase();

      // Try getAddress.io first (demo key has limited usage)
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        const response = await fetch(
          `https://api.getAddress.io/find/${cleanPostcode}?api-key=demo&format=json`,
          { signal: controller.signal }
        );
        
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          if (data.addresses && data.addresses.length > 0) {
            const formattedAddresses = data.addresses.map((addr: string) => `${addr}, ${cleanPostcode}`);
            return res.json({ 
              success: true, 
              addresses: formattedAddresses,
              source: 'getAddress.io'
            });
          }
        }
      } catch (error) {
        console.warn("getAddress.io API failed:", error instanceof Error ? error.message : 'Unknown error');
      }

      // Fallback to postcodes.io for validation
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        const postcodeResponse = await fetch(
          `https://api.postcodes.io/postcodes/${cleanPostcode}`,
          { signal: controller.signal }
        );
        
        clearTimeout(timeoutId);

        if (postcodeResponse.ok) {
          const postcodeData = await postcodeResponse.json();
          if (postcodeData.result) {
            const result = postcodeData.result;
            const address = [
              result.admin_district,
              result.admin_county,
              result.country,
              cleanPostcode
            ].filter(Boolean).join(', ');
            
            return res.json({ 
              success: true, 
              addresses: [address],
              validated: true,
              source: 'postcodes.io'
            });
          }
        }
      } catch (error) {
        console.warn("postcodes.io API failed:", error instanceof Error ? error.message : 'Unknown error');
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

    // Add deployment status endpoint
    app.get("/api/deployment-status", (req, res) => {
      try {
        const status = {
          serverReady,
          objectStorage: {
            moduleLoaded: objectStorageAvailable,
            initialized: objectStorageInitialized,
            available: objectStorage ? "available" : "unavailable"
          },
          environment: process.env.NODE_ENV || "development",
          uptime: process.uptime(),
          timestamp: new Date().toISOString(),
          status: serverReady ? "ready" : "starting"
        };
        
        res.json(status);
      } catch (error) {
        console.error("Deployment status error:", error);
        res.status(500).json({
          status: "error",
          message: "Failed to get deployment status",
          timestamp: new Date().toISOString()
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