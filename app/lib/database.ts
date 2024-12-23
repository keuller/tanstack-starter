import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import type { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import schema from "./store/schema";

export type StarterDB = BetterSQLite3Database<typeof schema>;

let db: StarterDB;

const client = new Database(process.env.DATABASE_URL);
client.pragma("journal_mode = WAL");

export function conn(): StarterDB {
    if (!db) db = drizzle({ client, schema });
    return db;
}

export function ping(): void | never {
    if (!db) throw new Error("Database connection was not established.");
    db.select().from(schema.users).limit(1).run();
}
