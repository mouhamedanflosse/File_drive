import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createdocs = mutation({
  args: {
    name: v.string(),
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError("you must loged in before adding any docs.")
    }
    await ctx.db.insert("docs", {
      name: args.name,
      orgId : args.orgId
    });
  },
});


export const getdocs = query({
  args: {
    orgId : v.string()
  },
  handler: async (ctx,args) => {
    const identity = await ctx.auth.getUserIdentity()
    // if (!identity) {
    //   throw new ConvexError("you must loged in before fetchinng any docs.")
    // }
    return await ctx.db.query("docs").withIndex("by_orgId", q => q.eq("orgId" , args.orgId)).collect();
  },
});

