import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Temporary test function to add a model
export const addTestModel = mutation({
  args: {},
  handler: async (ctx) => {
    const now = new Date().toISOString();
    const modelId = await ctx.db.insert("models", {
      name: "Osei",
      age: 54,
      tagline: "The minimal muse.",
      mainImage: "https://example.com/test-image.jpg",
      categoryImages: {
        casual: "https://example.com/casual-look.jpg",
        formal: "https://example.com/formal-look.jpg",
        sports: "https://example.com/sports-look.jpg",
        evening: "https://example.com/evening-look.jpg",
        commercial: "https://example.com/commercial-look.jpg"
      },
      bio: "Osei, a man of distinction in his late fifties, embodies the refined strength of Ghana's Ashanti royal heritage.",
      status: "active",
      highlights: {
        ageRange: "Late 50s",
        skinTone: "Deep Ebony",
        styleVibe: "Corporate Leadership, Refined Minimalism",
        height: "5'11\"",
        build: "Executive Build",
        ethnicity: "Ghanaian",
        features: "Silver Beard, Authoritative Gaze, Wisdom Lines"
      },
      createdAt: now,
      updatedAt: now,
      viewCount: 0,
    });
    return modelId;
  },
});