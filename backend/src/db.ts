console.log("=== ENVIRONMENT DEBUG START ===");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("All environment variables count:", Object.keys(process.env).length);
console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);
console.log("DATABASE_URL type:", typeof process.env.DATABASE_URL);
if (process.env.DATABASE_URL) {
    console.log("DATABASE_URL first 30 chars:", process.env.DATABASE_URL.substring(0, 30));
    console.log("DATABASE_URL length:", process.env.DATABASE_URL.length);
}
console.log("=== ENVIRONMENT DEBUG END ===");

// Your existing code below...
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    console.error("❌ DATABASE_URL is not set!");
    throw new Error("DATABASE_URL must be set.");
}
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set.");
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });
