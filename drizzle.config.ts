import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./app/lib/store/schema.ts",
	out: "./migrations",
	dialect: "sqlite",
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
});
