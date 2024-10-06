import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    docs : defineTable({name : v.string(),orgId : v.string()}).index("by_orgId", ["orgId"]),
    users : defineTable({tokenIdentifier : v.string(),image : v.string(), name : v.string() , orgIDs : v.array(v.string())}).index("by_tokenIdentifier" , ["tokenIdentifier"]),
})