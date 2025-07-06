import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCallbackRequestSchema, insertQuoteRequestSchema } from "@shared/schema";
import { generateAIResponse } from "./ai-chat";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
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
            const formattedAddresses = data.addresses.map(addr => `${addr}, ${cleanPostcode}`);
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