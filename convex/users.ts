import { ConvexError, v } from "convex/values";

import {  MutationCtx, QueryCtx, internalMutation } from "./_generated/server";



export const getUserById = (ctx : QueryCtx | MutationCtx , tokenIdentifier : string) => {
  const user = ctx.db.query("users").withIndex("by_tokenIdentifier" , q => q.eq("tokenIdentifier" , tokenIdentifier)).first()

  if (!user) {
    throw new ConvexError("user must be defined")
  }
  return user
} 

// create user
export const createUser = internalMutation({
  args: { tokenIdentifier: v.string(), image: v.string() ,name : v.string()  },
  handler: async (ctx, args) => {
    await ctx.db.insert("users", {
        tokenIdentifier: args.tokenIdentifier,
        image : args.image,
        name : args.name,
        orgsID : []
      });
  },
});

// add orgsID to user 
export const addOrgsIDToUser = internalMutation({
  args: { tokenIdentifier: v.string(),   orgsID : v.array(v.string())},
  handler: async (ctx, args) => {
   const user = await getUserById(ctx,args.tokenIdentifier)

   if (!user) {
    throw new ConvexError("user must be defined")
   }
    await ctx.db.patch(user?._id, {
        orgsID : [...user.orgsID,...args.orgsID]
      });
  },
});


