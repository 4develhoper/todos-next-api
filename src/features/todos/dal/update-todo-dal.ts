/** @format */

import "server-only";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { todos } from "@/db/schema";
import type { TTodo, TTodoTarget, TUpdateTodoInput } from "../types";
import { ownedBy } from "./get-todo-dal";

/** Ne modifie qu'une todo non supprimée du projet ; `updated_at` est mis à jour par `$onUpdate`. */
export const updateTodo = async ({ source, id }: TTodoTarget, input: TUpdateTodoInput): Promise<TTodo | undefined> => {
  const [row] = await db
    .update(todos)
    .set(input)
    .where(and(eq(todos.id, id), ownedBy(source)))
    .returning();
  return row;
};
