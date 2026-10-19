/** @format */

import type { TDocEndpoint, TDocError, TDocField, THttpMethod } from "./docs.types";

/** URL publique de l'API, affichée dans les exemples. */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3045";

/** Chemin de la version Markdown de la documentation (pour les agents IA). */
export const DOCS_MARKDOWN_PATH = "/api-docs.md";

export const METHOD_STYLES: Record<THttpMethod, string> = {
  GET: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
  POST: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  PATCH: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  DELETE: "bg-rose-500/15 text-rose-700 dark:text-rose-300",
};

const EXAMPLE_TODO = {
  id: 1792243321224,
  title: "Acheter du pain",
  done: false,
  source: "mon-projet",
  created_at: "2026-10-17T13:22:01.227Z",
  updated_at: "2026-10-17T13:22:01.227Z",
  deleted_at: null,
};

const ok = (data: unknown, message: string) => ({ status: 1, data, message, errors: null });

export const TODO_FIELDS: TDocField[] = [
  { name: "id", type: "number", required: true, description: "`Date.now()` à la création (timestamp en ms), unique." },
  { name: "title", type: "string", required: true, description: "1 à 255 caractères, espaces de début et de fin retirés." },
  { name: "done", type: "boolean", required: true, description: "`false` par défaut." },
  { name: "source", type: "string", required: true, description: "Slug du projet appelant (`mon-projet`) : cloisonne les todos par projet." },
  { name: "created_at", type: "string (ISO 8601)", required: true, description: "Date de création." },
  { name: "updated_at", type: "string (ISO 8601)", required: true, description: "Date de dernière modification." },
  { name: "deleted_at", type: "string (ISO 8601) | null", required: true, description: "Date de suppression logique, `null` tant que la todo existe." },
];

const SOURCE_RULE = "Slug : minuscules, chiffres et tirets (`^[a-z0-9]+(-[a-z0-9]+)*$`), 100 caractères max.";

/** Obligatoire sur toutes les routes todos : chaque requête ne voit que les todos de son projet. */
const SOURCE_HEADER_FIELD: TDocField = { name: "x-app-source", type: "string", required: true, description: `Projet appelant. ${SOURCE_RULE}` };

const SOURCE_EXAMPLE_HEADERS = { "x-app-source": "mon-projet" };

const ID_PARAM: TDocField = { name: "id", type: "number", required: true, description: "Identifiant de la todo." };

export const DOC_ENDPOINTS: TDocEndpoint[] = [
  {
    id: "list",
    method: "GET",
    path: "/api/todos",
    summary: "Lister les todos",
    description: "Todos non supprimées du projet, les plus récentes d'abord.",
    headers: [SOURCE_HEADER_FIELD],
    query: [{ name: "done", type: '"true" | "false"', required: false, description: "Filtre par état." }],
    exampleHeaders: SOURCE_EXAMPLE_HEADERS,
    examplePath: "/api/todos?done=false",
    exampleResponse: ok([EXAMPLE_TODO], "Todos récupérées"),
    httpStatus: 200,
    errors: ["400 Validation échouée (header x-app-source absent ou invalide, done invalide)"],
  },
  {
    id: "create",
    method: "POST",
    path: "/api/todos",
    summary: "Créer une todo",
    description: "Crée une todo pour le projet du header `x-app-source`.",
    headers: [SOURCE_HEADER_FIELD],
    body: [
      { name: "title", type: "string", required: true, description: "1 à 255 caractères." },
      { name: "done", type: "boolean", required: false, description: "`false` par défaut." },
    ],
    exampleHeaders: SOURCE_EXAMPLE_HEADERS,
    exampleBody: { title: "Acheter du pain" },
    examplePath: "/api/todos",
    exampleResponse: ok(EXAMPLE_TODO, "Todo créée"),
    httpStatus: 201,
    errors: ["400 Validation échouée (corps absent, title invalide, header x-app-source absent ou invalide)"],
  },
  {
    id: "find",
    method: "GET",
    path: "/api/todos/:id",
    summary: "Lire une todo",
    description: "Renvoie une todo non supprimée du projet.",
    headers: [SOURCE_HEADER_FIELD],
    params: [ID_PARAM],
    exampleHeaders: SOURCE_EXAMPLE_HEADERS,
    examplePath: `/api/todos/${EXAMPLE_TODO.id}`,
    exampleResponse: ok(EXAMPLE_TODO, "Todo récupérée"),
    httpStatus: 200,
    errors: ["400 Validation échouée (header x-app-source absent ou invalide, id invalide)", "404 Todo introuvable (inexistante, supprimée ou d'un autre projet)"],
  },
  {
    id: "update",
    method: "PATCH",
    path: "/api/todos/:id",
    summary: "Modifier une todo",
    description: "Modifie `title` et/ou `done` (au moins un des deux). `source` n'est pas modifiable. Une todo supprimée ou d'un autre projet ne peut pas être modifiée.",
    headers: [SOURCE_HEADER_FIELD],
    params: [ID_PARAM],
    body: [
      { name: "title", type: "string", required: false, description: "1 à 255 caractères." },
      { name: "done", type: "boolean", required: false, description: "Nouvel état." },
    ],
    exampleHeaders: SOURCE_EXAMPLE_HEADERS,
    exampleBody: { done: true },
    examplePath: `/api/todos/${EXAMPLE_TODO.id}`,
    exampleResponse: ok({ ...EXAMPLE_TODO, done: true, updated_at: "2026-10-17T13:25:12.004Z" }, "Todo modifiée"),
    httpStatus: 200,
    errors: ["400 Validation échouée (header x-app-source absent ou invalide, id invalide, corps vide ou champ invalide)", "404 Todo introuvable (inexistante, supprimée ou d'un autre projet)"],
  },
  {
    id: "delete",
    method: "DELETE",
    path: "/api/todos/:id",
    summary: "Supprimer une todo",
    description: "Suppression logique : renseigne `deleted_at`. La todo n'apparaît plus dans les lectures.",
    headers: [SOURCE_HEADER_FIELD],
    params: [ID_PARAM],
    exampleHeaders: SOURCE_EXAMPLE_HEADERS,
    examplePath: `/api/todos/${EXAMPLE_TODO.id}`,
    exampleResponse: ok({ ...EXAMPLE_TODO, updated_at: "2026-10-17T13:30:00.000Z", deleted_at: "2026-10-17T13:30:00.000Z" }, "Todo supprimée"),
    httpStatus: 200,
    errors: ["400 Validation échouée (header x-app-source absent ou invalide, id invalide)", "404 Todo introuvable (inexistante, déjà supprimée ou d'un autre projet)"],
  },
  {
    id: "delete-many",
    method: "DELETE",
    path: "/api/todos",
    summary: "Supprimer toutes les todos d'un projet",
    description: "Suppression logique de toutes les todos du projet du header `x-app-source`. Pratique pour réinitialiser les données de test d'un projet.",
    headers: [SOURCE_HEADER_FIELD],
    exampleHeaders: SOURCE_EXAMPLE_HEADERS,
    examplePath: "/api/todos",
    exampleResponse: ok({ deleted: 3 }, "3 todo(s) supprimée(s)"),
    httpStatus: 200,
    errors: ["400 Validation échouée (header x-app-source absent ou invalide)"],
  },
  {
    id: "health",
    method: "GET",
    path: "/api/health",
    summary: "État de l'API",
    description: "Vérifie que l'API et la base de données répondent.",
    examplePath: "/api/health",
    exampleResponse: ok({ ok: true }, "API opérationnelle"),
    httpStatus: 200,
    errors: ["500 base de données indisponible"],
  },
];

export const DOC_ERRORS: TDocError[] = [
  { httpStatus: 400, message: "Validation échouée", when: "Header `x-app-source` absent ou invalide, paramètre, query ou corps JSON invalide. Le détail est dans `errors`." },
  { httpStatus: 404, message: "Todo introuvable", when: "L'id n'existe pas, la todo est supprimée ou appartient à un autre projet. `errors` vaut `null`." },
  { httpStatus: 500, message: "Erreur interne du serveur", when: "Erreur serveur inattendue (le détail reste dans les logs du serveur). `errors` vaut `null`." },
];

export const SUCCESS_EXAMPLE = ok(EXAMPLE_TODO, "Todo récupérée");

export const ERROR_EXAMPLE = {
  status: 0,
  data: null,
  message: "Validation échouée",
  errors: { title: ["title requis"], source: ["source doit être un slug (ex. mon-projet)"] },
};

export const RESPONSE_TYPE = `type TApiResponse<TData> =
  | { status: 1; data: TData; message: string; errors: null }
  | { status: 0; data: null; message: string; errors: Record<string, string[]> | null };`;

export const CLIENT_SNIPPET = `const API_URL = "${API_BASE_URL}";
const SOURCE = "mon-projet";

type TTodo = {
  id: number;
  title: string;
  done: boolean;
  source: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

${RESPONSE_TYPE}

const request = async <TData>(path: string, init?: RequestInit): Promise<TApiResponse<TData>> => {
  const response = await fetch(\`\${API_URL}\${path}\`, {
    ...init,
    headers: { "Content-Type": "application/json", "x-app-source": SOURCE, ...init?.headers },
  });
  return response.json();
};

export const todosApi = {
  list: () => request<TTodo[]>("/api/todos"),
  find: (id: number) => request<TTodo>(\`/api/todos/\${id}\`),
  create: (title: string) => request<TTodo>("/api/todos", { method: "POST", body: JSON.stringify({ title }) }),
  update: (id: number, input: { title?: string; done?: boolean }) =>
    request<TTodo>(\`/api/todos/\${id}\`, { method: "PATCH", body: JSON.stringify(input) }),
  remove: (id: number) => request<TTodo>(\`/api/todos/\${id}\`, { method: "DELETE" }),
  clear: () => request<{ deleted: number }>("/api/todos", { method: "DELETE" }),
};`;

export const json = (value: unknown): string => JSON.stringify(value, null, 2);

/** Commande curl de l'exemple d'un endpoint. */
export const toCurl = (endpoint: TDocEndpoint): string => {
  const url = `${API_BASE_URL}${endpoint.examplePath}`;
  const parts = [`curl -X ${endpoint.method} "${url}"`];
  for (const [name, value] of Object.entries(endpoint.exampleHeaders ?? {})) parts.push(`-H "${name}: ${value}"`);
  if (endpoint.exampleBody !== undefined) {
    parts.push(`-H "Content-Type: application/json"`, `-d '${JSON.stringify(endpoint.exampleBody)}'`);
  }
  return parts.join(" \\\n  ");
};

const fieldsToMarkdown = (title: string, fields: TDocField[]): string =>
  [
    `**${title}**`,
    "",
    "| Nom | Type | Requis | Description |",
    "| --- | --- | --- | --- |",
    ...fields.map((field) => `| \`${field.name}\` | \`${field.type}\` | ${field.required ? "oui" : "non"} | ${field.description} |`),
  ].join("\n");

const endpointToMarkdown = (endpoint: TDocEndpoint): string =>
  [
    `### ${endpoint.summary}`,
    "",
    `\`${endpoint.method} ${endpoint.path}\``,
    "",
    endpoint.description,
    endpoint.headers && `\n${fieldsToMarkdown("Headers", endpoint.headers)}`,
    endpoint.params && `\n${fieldsToMarkdown("Paramètres d'URL", endpoint.params)}`,
    endpoint.query && `\n${fieldsToMarkdown("Query string", endpoint.query)}`,
    endpoint.body && `\n${fieldsToMarkdown("Corps JSON", endpoint.body)}`,
    "",
    "Exemple :",
    "",
    "```bash",
    toCurl(endpoint),
    "```",
    "",
    `Réponse \`${endpoint.httpStatus}\` :`,
    "",
    "```json",
    json(endpoint.exampleResponse),
    "```",
    "",
    `Erreurs : ${endpoint.errors.join(" ; ")}.`,
  ]
    .filter((line) => line !== undefined)
    .join("\n");

/** Documentation complète en Markdown, servie sur `DOCS_MARKDOWN_PATH`. */
export const toMarkdown = (): string =>
  [
    "# Todo API",
    "",
    "API REST de todos partagée entre plusieurs projets de test. Chaque projet envoie sa propre `source` (slug) dans le header `x-app-source` pour cloisonner ses todos : ce header est obligatoire sur toutes les routes todos, et une requête ne voit, ne modifie et ne supprime que les todos de son projet.",
    "",
    `- URL de base : \`${API_BASE_URL}\``,
    "- Format : JSON (`Content-Type: application/json` pour les corps de requête).",
    "- Pas d'authentification. CORS ouvert sur `/api/*` (origine configurée par `CORS_ORIGIN`, `*` par défaut).",
    "- Suppression logique : une todo supprimée garde ses données en base avec `deleted_at` renseigné, mais n'est plus renvoyée ni modifiable.",
    "",
    "## Format des réponses",
    "",
    "Toutes les routes renvoient la même enveloppe. `status` vaut `1` (succès) ou `0` (erreur) ; le code HTTP est aussi renseigné.",
    "",
    "```ts",
    RESPONSE_TYPE,
    "```",
    "",
    "Succès :",
    "",
    "```json",
    json(SUCCESS_EXAMPLE),
    "```",
    "",
    "Erreur de validation : `errors` regroupe les messages par champ ; les erreurs qui ne visent aucun champ (id d'URL invalide, corps vide…) sont sous la clé `_root`.",
    "",
    "```json",
    json(ERROR_EXAMPLE),
    "```",
    "",
    "| HTTP | message | Cas |",
    "| --- | --- | --- |",
    ...DOC_ERRORS.map((error) => `| ${error.httpStatus} | ${error.message} | ${error.when} |`),
    "",
    "## Modèle Todo",
    "",
    "| Champ | Type | Description |",
    "| --- | --- | --- |",
    ...TODO_FIELDS.map((field) => `| \`${field.name}\` | \`${field.type}\` | ${field.description} |`),
    "",
    "## Endpoints",
    "",
    ...DOC_ENDPOINTS.map(endpointToMarkdown).flatMap((section) => [section, ""]),
    "## Client TypeScript prêt à copier",
    "",
    "Remplacer `SOURCE` par le slug du projet : il est envoyé dans le header `x-app-source` de chaque requête.",
    "",
    "```ts",
    CLIENT_SNIPPET,
    "```",
    "",
  ].join("\n");
