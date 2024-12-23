import { sql } from "drizzle-orm";
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { sqliteTable, integer, text, unique } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
    id: text("id", { length: 10 }).primaryKey(),
    email: text("email", { length: 120 }).notNull(),
    username: text("username", { length: 30 }).notNull(),
    password: text("password", { length: 120 }).notNull(),
    active: integer("active", { mode: "boolean" }).default(true),
    createdAt: integer("created_at", { mode: "timestamp_ms" }).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
}, (t) => [
    unique("idx_users_email").on(t.email),
]);

export type SelectUser = typeof usersTable.$inferInsert;
export type InsertUser = typeof usersTable.$inferInsert;
export const SelectUserSchema = createSelectSchema(usersTable);
export const InsertUserSchema = createInsertSchema(usersTable);

export default {
    users: usersTable,
}