import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const callbackRequests = pgTable("callback_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const quoteRequests = pgTable("quote_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  propertyType: text("property_type").notNull(),
  serviceType: text("service_type").notNull(),
  accessDetails: text("access_details"),
  timeframe: text("timeframe"),
  additionalInfo: text("additional_info"),
  images: text("images").array(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCallbackRequestSchema = createInsertSchema(callbackRequests).pick({
  name: true,
  phone: true,
});

export const insertQuoteRequestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  propertyType: z.string().min(1, "Property type is required"),
  serviceType: z.string().min(1, "Service type is required"),
  timeframe: z.string().optional(),
  accessDetails: z.string().optional(),
  additionalInfo: z.string().optional(),
  images: z.array(z.string().url()).optional().default([]), // Now expects URLs instead of base64
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertCallbackRequest = z.infer<typeof insertCallbackRequestSchema>;
export type CallbackRequest = typeof callbackRequests.$inferSelect;
export type InsertQuoteRequest = z.infer<typeof insertQuoteRequestSchema>;
export type QuoteRequest = typeof quoteRequests.$inferSelect;