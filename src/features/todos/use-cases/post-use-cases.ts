/** @format */

import "server-only";
import { success, validationFailure } from "@/lib/api.utils";
import todoDAL from "../dal";
import { createTodoSchema } from "../schemas";

export const createTodoUseCase = async (source: string | undefined, body: unknown) => {
  // `undefined` (corps absent) reste tel quel pour garder l'erreur « corps absent ».
  const input = createTodoSchema.safeParse(body === undefined ? body : { ...(body as object), source });
  if (!input.success) return validationFailure(input.error);

  return success(await todoDAL.create(input.data), "Todo créée", 201);
};
