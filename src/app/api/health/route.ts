/** @format */

import { sql } from "drizzle-orm";
import { connection } from "next/server";
import { db } from "@/db";
import { handleRoute, success } from "@/lib/api.utils";

/** `GET /api/health` — vérifie aussi que la base répond. */
export const GET = async () => {
  // Hors de `handleRoute` : pendant le build, `connection()` interrompt volontairement le prérendu.
  await connection();
  return handleRoute("GET /api/health", async () => {
    await db.run(sql`select 1`);
    return success({ ok: true }, "API opérationnelle");
  });
};
