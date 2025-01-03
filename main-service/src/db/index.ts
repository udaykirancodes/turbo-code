import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schema";

export const pool = new Pool({
  connectionString: process.env.DB_URL,
});
export const db = drizzle({ client: pool, schema });
