/** @format */

import "server-only";
import { failure, success, validationFailure } from "@/lib/api.utils";
import todoDAL from "../dal";
import { todoTargetSchema, updateTodoSchema } from "../schemas";

export const updateTodoUseCase = async (source: string | undefined, rawId: string, body: unknown) => {
  const target = todoTargetSchema.safeParse({ source, id: rawId });
  if (!target.success) return validationFailure(target.error);

  const input = updateTodoSchema.safeParse(body);
  if (!input.success) return validationFailure(input.error);

  const todo = await todoDAL.update(target.data, input.data);
  return todo ? success(todo, "Todo modifiée") : failure("Todo introuvable", 404);
};
