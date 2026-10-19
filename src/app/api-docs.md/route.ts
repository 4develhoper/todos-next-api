/** @format */

import { toMarkdown } from "@/features/docs/docs.utils";

/** `GET /api-docs.md` — documentation de l'API en Markdown, pour les agents IA. */
export const GET = async () =>
  new Response(toMarkdown(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
