import { sql } from "./postgres";

export async function seed() {
  const createViewsTable = await sql`
    CREATE TABLE IF NOT EXISTS views (
      slug VARCHAR(255) PRIMARY KEY,
      count INT NOT NULL
    );
    `;
  return {
    createViewsTable,
  };
}
