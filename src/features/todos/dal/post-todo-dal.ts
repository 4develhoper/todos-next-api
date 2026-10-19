/** @format */

import "server-only";
import { db } from "@/db";
import { todos } from "@/db/schema";
import type { TCreateTodoInput, TTodo } from "../types";

let lastId = 0;

/** `Date.now()`, rendu strictement croissant pour deux créations dans la même milliseconde. */
const nextTodoId = (): number => {
  lastId = Math.max(Date.now(), lastId + 1);
  return lastId;
};

export const createTodo = async (input: TCreateTodoInput): Promise<TTodo> => {
  const [row] = await db
    .insert(todos)
    .values({ ...input, id: nextTodoId() })
    .returning();
  return row;
};
