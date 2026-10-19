/** @format */

import { NextResponse } from "next/server";
import { z } from "zod";
import type { TApiBody, TApiErrors, TUseCaseResult } from "./api.types";

export const success = <TData>(data: TData, message: string, httpStatus = 200): TUseCaseResult<TData> => ({ ok: true, httpStatus, data, message });

export const failure = (message: string, httpStatus: number, errors: TApiErrors | null = null): TUseCaseResult<never> => ({ ok: false, httpStatus, message, errors });

/** Erreurs Zod regroupées par champ : `{ title: ["title requis"] }` ; les erreurs sans champ vont dans `_root`. */
export const validationFailure = (error: z.ZodError): TUseCaseResult<never> => {
  const { formErrors, fieldErrors } = z.flattenError(error);
  const errors: TApiErrors = { ...(fieldErrors as TApiErrors) };
  if (formErrors.length) errors._root = formErrors;
  return failure("Validation échouée", 400, errors);
};

/** Header qui porte le slug du projet appelant. */
export const SOURCE_HEADER = "x-app-source";

/** Source du projet appelant lue dans le header `x-app-source`, ou `undefined` s'il est absent. */
export const readSource = (request: Request): string | undefined => request.headers.get(SOURCE_HEADER) ?? undefined;

/** Corps JSON de la requête, ou `undefined` s'il est absent ou mal formé. */
export const readJson = async (request: Request): Promise<unknown> => request.json().catch(() => undefined);

export const toResponse = <TData>(result: TUseCaseResult<TData>) =>
  NextResponse.json<TApiBody<TData>>(result.ok ? { status: 1, data: result.data, message: result.message, errors: null } : { status: 0, data: null, message: result.message, errors: result.errors }, {
    status: result.httpStatus,
  });

/** Filet de sécurité des routes : le détail de l'erreur (SQL…) reste dans les logs, le client reçoit un message générique. */
export const handleRoute = async <TData>(label: string, run: () => Promise<TUseCaseResult<TData>>) => {
  try {
    return toResponse(await run());
  } catch (error) {
    console.error(`[api] ${label}`, error);
    return toResponse(failure("Erreur interne du serveur", 500));
  }
};
