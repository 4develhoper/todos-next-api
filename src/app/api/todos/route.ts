/** @format */

import type { NextRequest } from "next/server";
import { deleteManyTodosUseCase } from "@/features/todos/use-cases/delete-use-cases";
import { listTodosUseCase } from "@/features/todos/use-cases/get-use-cases";
import { createTodoUseCase } from "@/features/todos/use-cases/post-use-cases";
import { handleRoute, readJson, readSource } from "@/lib/api.utils";

/** `GET /api/todos?done=false` — header `x-app-source: mon-projet` */
export const GET = async (request: NextRequest) => handleRoute("GET /api/todos", () => listTodosUseCase(readSource(request), request.nextUrl.searchParams));

/** `POST /api/todos` — `{ title, done? }` — header `x-app-source: mon-projet` */
export const POST = async (request: NextRequest) => handleRoute("POST /api/todos", async () => createTodoUseCase(readSource(request), await readJson(request)));

/** `DELETE /api/todos` — header `x-app-source: mon-projet` — suppression logique de toutes les todos du projet. */
export const DELETE = async (request: NextRequest) => handleRoute("DELETE /api/todos", () => deleteManyTodosUseCase(readSource(request)));
