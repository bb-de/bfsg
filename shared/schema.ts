import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Accessibility settings schema
export const accessibilitySettings = pgTable("accessibility_settings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  darkContrast: boolean("dark_contrast").default(false),
  lightContrast: boolean("light_contrast").default(false),
  monochrome: boolean("monochrome").default(false),
  highSaturation: boolean("high_saturation").default(false),
  fontSize: text("font_size").default("default"),
  lineSpacing: text("line_spacing").default("default"),
  letterSpacing: text("letter_spacing").default("default"),
  readingGuide: boolean("reading_guide").default(false),
  largeCursor: boolean("large_cursor").default(false),
  activeProfile: text("active_profile").default(""),
});

export const insertAccessibilitySettingsSchema = createInsertSchema(accessibilitySettings).omit({
  id: true,
});

export type InsertAccessibilitySettings = z.infer<typeof insertAccessibilitySettingsSchema>;
export type AccessibilitySettings = typeof accessibilitySettings.$inferSelect;
