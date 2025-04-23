import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAccessibilitySettingsSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get('/api/settings/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const settings = await storage.getAccessibilitySettings(userId);
      if (!settings) {
        return res.status(404).json({ message: "Settings not found" });
      }
      
      res.json(settings);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve settings" });
    }
  });

  app.post('/api/settings', async (req, res) => {
    try {
      const result = insertAccessibilitySettingsSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid settings data", errors: result.error.format() });
      }
      
      const settings = await storage.saveAccessibilitySettings(result.data);
      res.status(201).json(settings);
    } catch (error) {
      res.status(500).json({ message: "Failed to save settings" });
    }
  });

  app.put('/api/settings/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const result = insertAccessibilitySettingsSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid settings data", errors: result.error.format() });
      }
      
      const settings = await storage.updateAccessibilitySettings(userId, result.data);
      if (!settings) {
        return res.status(404).json({ message: "Settings not found" });
      }
      
      res.json(settings);
    } catch (error) {
      res.status(500).json({ message: "Failed to update settings" });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
