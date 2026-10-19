/** @format */

import "server-only";
import { failure, success, validationFailure } from "@/lib/api.utils";
import todoDAL from "../dal";
import { todoSourceSchema, todoTargetSchema } from "../schemas";

export const deleteTodoUseCase = async (source: string | undefined, rawId: string) => {
  const target = todoTargetSchema.safeParse({ source, id: rawId });
  if (!target.success) return validationFailure(target.error);

  const todo = await todoDAL.delete(target.data);
  return todo ? success(todo, "Todo supprimée") : failure("Todo introuvable", 404);
};

export const deleteManyTodosUseCase = async (rawSource: string | undefined) => {
  const source = todoSourceSchema.safeParse(rawSource);
  if (!source.success) return validationFailure(source.error);

  const deleted = await todoDAL.deleteMany(source.data);
  return success({ deleted }, `${deleted} todo(s) supprimée(s)`);
};
