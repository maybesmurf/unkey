import { mysqlTable, varchar, json, datetime, boolean, text, int } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";
import { apis } from "./apis";
import { tenants } from "./tenants";

export const keys = mysqlTable("keys", {
  id: varchar("id", { length: 256 }).primaryKey(),
  apiId: varchar("api_id", { length: 256 }),
  tenantId: varchar("tenant_id", { length: 256 }).notNull(),
  hash: varchar("hash", { length: 256 }).notNull(),
  start: varchar("start", { length: 256 }).notNull(),
  ownerId: varchar("owner_id", { length: 256 }),
  meta: json("meta"),
  createdAt: datetime("created_at", { fsp: 3 }).notNull(), // unix milli
  expires: datetime("expires", { fsp: 3 }), // unix
  policy: text("policy"), // TODO: move this to a separate table so we can reference a single policy in multiple keys
  // Internal keys are used to interact with the unkey API instead of 3rd party users
  internal: boolean("internal"),
  ratelimitType: text("ratelimit_type", { enum: ["consistent", "fast"] }),
  ratelimitBurst: int("ratelimit_burst"),
  ratelimitRefillRate: int("ratelimit_rate"),
  ratelimitRefillTime: int("ratelimit_time"), // seconds
});

export const keysRelations = relations(keys, ({ one }) => ({
  tenant: one(tenants, {
    fields: [keys.tenantId],
    references: [tenants.id],
  }),
  app: one(apis, {
    fields: [keys.apiId],
    references: [apis.id],
  }),
}));