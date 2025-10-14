import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get site settings
export const get = query({
  args: {},
  handler: async (ctx) => {
    const settings = await ctx.db.query("settings").order("desc").collect();
    return settings.length > 0 ? settings[0] : null;
  },
});

// Initialize default settings
export const initDefault = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("settings").collect();
    if (existing.length === 0) {
      const now = new Date().toISOString();
      return await ctx.db.insert("settings", {
        siteName: "GenV Studios",
        logoUrl: "https://via.placeholder.com/150x50/d4af37/000000?text=GenV",
        contactEmail: "contact@genvstudios.com",
        phoneNumber: "+1 (555) 123-4567",
        address: "123 Fashion Avenue, Style City, SC 12345",
        updatedAt: now,
      });
    }
    return existing[0]._id;
  },
});

// Update site settings (create if not exists)
export const update = mutation({
  args: {
    siteName: v.string(),
    logoUrl: v.string(),
    contactEmail: v.string(),
    phoneNumber: v.string(),
    address: v.string(),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();
    // Get current settings
    const settings = await ctx.db.query("settings").order("desc").collect();
    let settingsId;
    if (settings.length > 0) {
      // Update existing
      await ctx.db.patch(settings[0]._id, {
        ...args,
        updatedAt: now,
      });
      settingsId = settings[0]._id;
    } else {
      // Create new
      settingsId = await ctx.db.insert("settings", {
        ...args,
        updatedAt: now,
      });
    }
    // Notify admin
    await ctx.db.insert("notifications", {
      message: `Site settings were updated`,
      type: "info",
      userId: "admin",
      read: false,
      createdAt: now
    });
    return settingsId;
  },
});
