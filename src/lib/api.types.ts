/** @format */

/** Erreurs par champ : `{ title: ["title requis"] }` ; `_root` porte les erreurs globales. */
export type TApiErrors = Record<string, string[]>;

/** Résultat d'un use-case : `httpStatus` est le code HTTP à renvoyer. */
export type TUseCaseResult<TData> =
  | { ok: true; httpStatus: number; data: TData; message: string }
  | { ok: false; httpStatus: number; message: string; errors: TApiErrors | null };

/** Corps JSON renvoyé par toutes les routes de l'API : `status` vaut 1 (succès) ou 0 (erreur). */
export type TApiBody<TData> =
  | { status: 1; data: TData; message: string; errors: null }
  | { status: 0; data: null; message: string; errors: TApiErrors | null };
