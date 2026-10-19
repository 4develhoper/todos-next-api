/** @format */

import type { NextRequest } from "next/server";
import { deleteTodoUseCase } from "@/features/todos/use-cases/delete-use-cases";
import { getTodoUseCase } from "@/features/todos/use-cases/get-use-cases";
import { updateTodoUseCase } from "@/features/todos/use-cases/update-use-cases";
import { handleRoute, readJson, readSource } from "@/lib/api.utils";

/** `GET /api/todos/:id` — header `x-app-source: mon-projet` */
export const GET = async (request: NextRequest, ctx: RouteContext<"/api/todos/[id]">) => handleRoute("GET /api/todos/[id]", async () => getTodoUseCase(readSource(request), (await ctx.params).id));

/** `PATCH /api/todos/:id` — `{ title?, done? }` — header `x-app-source: mon-projet` */
export const PATCH = async (request: NextRequest, ctx: RouteContext<"/api/todos/[id]">) =>
  handleRoute("PATCH /api/todos/[id]", async () => updateTodoUseCase(readSource(request), (await ctx.params).id, await readJson(request)));

/** `DELETE /api/todos/:id` — header `x-app-source: mon-projet` — suppression logique. */
export const DELETE = async (request: NextRequest, ctx: RouteContext<"/api/todos/[id]">) => handleRoute("DELETE /api/todos/[id]", async () => deleteTodoUseCase(readSource(request), (await ctx.params).id));
