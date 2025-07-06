import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCallbackRequestSchema, insertQuoteRequestSchema } from "@shared/schema";
import { generateAIResponse } from "./ai-chat";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
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
