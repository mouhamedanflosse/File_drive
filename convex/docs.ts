import { ConvexError, v } from "convex/values";
import { MutationCtx, QueryCtx, mutation, query } from "./_generated/server";
import { getUserById } from "./users";

// access verification
export const hasAccessToOrg = async (ctx : QueryCtx | MutationCtx ,tokenIdentifier : string, orgId : string ) => {
  const user = await getUserById(ctx,tokenIdentifier)
  if (!user.orgIDs.includes(orgId) && !tokenIdentifier.includes(orgId)) {
    return null
  }
  return user
}

// create a doc file
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

    const hasAccess = await hasAccessToOrg(ctx,identity.tokenIdentifier,args.orgId)

    if (!hasAccess) {
      throw new ConvexError("you don't have access to this org")
    }

    await ctx.db.insert("docs", {
      name: args.name,
      orgId : args.orgId
    });
  },
});

//  get docs
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

