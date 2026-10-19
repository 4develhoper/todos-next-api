/** @format */

import "server-only";
import { and, desc, eq, isNull, type SQL } from "drizzle-orm";
import { db } from "@/db";
import { todos } from "@/db/schema";
import type { TTodo, TTodoListQuery, TTodoTarget } from "../types";

/** Condition commune : la todo appartient à `source` et n'est pas supprimée. */
export const ownedBy = (source: string): SQL => and(eq(todos.source, source), isNull(todos.deleted_at)) as SQL;

/** Todos non supprimées du projet, les plus récentes d'abord. */
export const getTodos = async ({ source, done }: TTodoListQuery): Promise<TTodo[]> => {
  const filters: SQL[] = [ownedBy(source)];
  if (done !== undefined) filters.push(eq(todos.done, done));

  return db
    .select()
    .from(todos)
    .where(and(...filters))
    .orderBy(desc(todos.id));
};

export const getTodo = async ({ source, id }: TTodoTarget): Promise<TTodo | undefined> => {
  const [row] = await db
    .select()
    .from(todos)
    .where(and(eq(todos.id, id), ownedBy(source)));
  return row;
};
