import { eq } from "drizzle-orm";
import type { StarterDB } from "../database";
import { usersTable, type InsertUser } from "./schema";

export async function createUser(db: StarterDB, user: InsertUser): Promise<unknown> {
    return db.insert(usersTable).values(user);
}

export function fetchUserByEmail(db: StarterDB, email: string) {
    const user = db.select().from(usersTable).where(eq(usersTable.email, email)).run();
    console.log(user);
}