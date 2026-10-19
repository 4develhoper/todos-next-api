/** @format */

import "server-only";
import { failure, success, validationFailure } from "@/lib/api.utils";
import todoDAL from "../dal";
import { todoListQuerySchema, todoTargetSchema } from "../schemas";

export const listTodosUseCase = async (source: string | undefined, searchParams: URLSearchParams) => {
  const query = todoListQuerySchema.safeParse({ ...Object.fromEntries(searchParams), source });
  if (!query.success) return validationFailure(query.error);

  return success(await todoDAL.all(query.data), "Todos récupérées");
};

/** Une todo d'un autre projet répond 404, comme une todo inexistante. */
export const getTodoUseCase = async (source: string | undefined, rawId: string) => {
  const target = todoTargetSchema.safeParse({ source, id: rawId });
  if (!target.success) return validationFailure(target.error);

  const todo = await todoDAL.find(target.data);
  return todo ? success(todo, "Todo récupérée") : failure("Todo introuvable", 404);
};
