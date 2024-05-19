import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createdocs = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError("you must loged in before adding any docs.")
    }
    await ctx.db.insert("docs", {
      name: args.name,
    });
  },
});

export const createProduct = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError("you must loged in before adding any docs.")
    }
    await ctx.db.insert("Prod", {
      name: args.name,
    });
  },
});

// export const getFiles = query({
//     args : {},
//     handler : async (ctx) => {
//         console.log("Write and test your query function here!");
//         return ctx.db.query("files").collect();
//       }
// })

export const getdocs = query({
  args: {},
  handler: async (ctx) => {
    // const identity = await ctx.auth.getUserIdentity()
    // if (!identity) {
    //   throw new ConvexError("you must loged in before fetchinng any docs.")
    // }
    return await ctx.db.query("docs").collect();
  },
});

export const getProd = query({
  args: {},
  handler: async (ctx) => {
    // const identity = await ctx.auth.getUserIdentity()
    // if (!identity) {
    //   throw new ConvexError("you must loged in before adding any docs.")
    // }
    return await ctx.db.query("Prod").collect();
  },
});
