/** @format */

import { z } from "zod";

export const todoIdSchema = z.coerce.number({ error: "id invalide" }).int({ error: "id invalide" }).positive({ error: "id invalide" });

/** Slug du projet appelant, lu dans le header `x-app-source` : obligatoire sur toutes les routes todos. */
export const todoSourceSchema = z
  .string({ error: "source requise (header x-app-source)" })
  .trim()
  .min(1, { error: "source requise (header x-app-source)" })
  .max(100, { error: "source trop longue (100 caractères maximum)" })
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    error: "source doit être un slug (ex. mon-projet)",
  });

/** Todo visée par une route `/api/todos/:id` : l'id seul ne suffit pas, la source doit correspondre. */
export const todoTargetSchema = z.object({
  source: todoSourceSchema,
  id: todoIdSchema,
});

const todoTitleSchema = z.string({ error: "title requis" }).trim().min(1, { error: "title requis" }).max(255, { error: "title trop long (255 caractères maximum)" });

export const createTodoSchema = z.object({
  title: todoTitleSchema,
  source: todoSourceSchema,
  done: z.boolean({ error: "done doit être un booléen" }).default(false),
});

export const updateTodoSchema = z
  .object({
    title: todoTitleSchema.optional(),
    done: z.boolean({ error: "done doit être un booléen" }).optional(),
  })
  .refine((data) => data.title !== undefined || data.done !== undefined, {
    error: "Fournir au moins title ou done",
  });

/** Filtres : `?done=true` en query, `source` lue dans le header `x-app-source`. */
export const todoListQuerySchema = z.object({
  source: todoSourceSchema,
  done: z
    .enum(["true", "false"], { error: "done doit valoir true ou false" })
    .transform((value) => value === "true")
    .optional(),
});
