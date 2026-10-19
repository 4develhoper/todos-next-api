/** @format */

import "server-only";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { todos } from "@/db/schema";
import type { TTodo, TTodoTarget } from "../types";
import { ownedBy } from "./get-todo-dal";

/** Suppression logique d'une todo du projet : renseigne `deleted_at`. */
export const deleteTodo = async ({ source, id }: TTodoTarget): Promise<TTodo | undefined> => {
  const [row] = await db
    .update(todos)
    .set({ deleted_at: new Date() })
    .where(and(eq(todos.id, id), ownedBy(source)))
    .returning();
  return row;
};

/** Suppression logique de toutes les todos d'une source ; renvoie le nombre de todos supprimées. */
export const deleteManyTodos = async (source: string): Promise<number> => {
  const rows = await db.update(todos).set({ deleted_at: new Date() }).where(ownedBy(source)).returning({ id: todos.id });
  return rows.length;
};
