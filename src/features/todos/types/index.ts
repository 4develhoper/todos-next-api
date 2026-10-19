/** @format */

import type { z } from "zod";
import type { todos } from "@/db/schema";
import type { createTodoSchema, todoListQuerySchema, todoTargetSchema, updateTodoSchema } from "../schemas";

export type TTodo = typeof todos.$inferSelect;

export type TCreateTodoInput = z.infer<typeof createTodoSchema>;
export type TUpdateTodoInput = z.infer<typeof updateTodoSchema>;
export type TTodoListQuery = z.infer<typeof todoListQuerySchema>;
/** Todo visée par son id, dans le projet `source`. */
export type TTodoTarget = z.infer<typeof todoTargetSchema>;
