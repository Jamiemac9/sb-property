import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

// Add process error handlers to prevent uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // In production, log the error but don't exit immediately
  if (process.env.NODE_ENV === 'production') {
    console.error('Application will continue running in production...');
  } else {
    process.exit(1);
  }
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // In production, log the error but don't exit immediately
  if (process.env.NODE_ENV === 'production') {
    console.error('Application will continue running in production...');
  } else {
    process.exit(1);
  }
});

const app = express();
// Increase body size limit to handle image uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  let server;
  
  try {
    console.log('Starting server initialization...');
    server = await registerRoutes(app);
    console.log('Routes registered successfully');
    
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      console.error("Server error:", err);
      
      // Always respond to the client
      if (!res.headersSent) {
        res.status(status).json({ message });
      }
      
      // Don't throw the error in production to prevent crashes
      if (process.env.NODE_ENV !== 'production') {
        throw err;
      }
    });

    // importantly only setup vite in development and after
    // setting up all the other routes so the catch-all route
    // doesn't interfere with the other routes
    const isProduction = process.env.NODE_ENV === 'production';
    if (!isProduction) {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    // ALWAYS serve the app on port 5000
    // this serves both the API and the client.
    // It is the only port that is not firewalled.
    const port = parseInt(process.env.PORT || '5000');
    
    // Enhanced server binding with production-safe error handling
    server.listen({
      port,
      host: "0.0.0.0",
      reusePort: true,
    }, (error?: Error) => {
      if (error) {
        console.error('Failed to bind to port:', error);
        if (process.env.NODE_ENV === 'production') {
          console.error('Server failed to start in production. Exiting...');
          process.exit(1);
        } else {
          throw error;
        }
      } else {
        log(`serving on port ${port}`);
      }
    });
    
    // Handle server errors
    server.on('error', (error: any) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use`);
        if (process.env.NODE_ENV === 'production') {
          console.error('Port conflict in production. Exiting...');
          process.exit(1);
        }
      } else {
        console.error('Server error:', error);
        if (process.env.NODE_ENV === 'production') {
          console.error('Server error in production. Exiting...');
          process.exit(1);
        }
      }
    });
    
    // Handle graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully...');
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });
    
    process.on('SIGINT', () => {
      console.log('SIGINT received, shutting down gracefully...');
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });
    
  } catch (error) {
    console.error('Failed to start server:', error);
    if (process.env.NODE_ENV === 'production') {
      // In production, try to continue or exit gracefully
      console.error('Server initialization failed in production environment');
      process.exit(1);
    } else {
      throw error;
    }
  }
})();
