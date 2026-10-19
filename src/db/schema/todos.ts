/** @format */

import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const timestampNow = (name: string) =>
  integer(name, { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull();

/**
 * Todo partagée entre plusieurs projets de test, cloisonnée par `source` (slug du projet appelant).
 * L'id vaut `Date.now()` à la création ; la suppression est logique (`deleted_at`).
 */
export const todos = sqliteTable(
  "todos",
  {
    id: integer("id").primaryKey(),
    title: text("title").notNull(),
    done: integer("done", { mode: "boolean" }).notNull().default(false),
    source: text("source").notNull(),
    created_at: timestampNow("created_at"),
    updated_at: timestampNow("updated_at").$onUpdate(() => new Date()),
    deleted_at: integer("deleted_at", { mode: "timestamp_ms" }),
  },
  (table) => [index("todos_source_idx").on(table.source)],
);
