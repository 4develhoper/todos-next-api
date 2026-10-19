/** @format */

import CodeBlock from "@/features/docs/components/code.block";
import EndpointCard from "@/features/docs/components/endpoint.card";
import MethodBadge from "@/features/docs/components/method.badge";
import RichText from "@/features/docs/components/rich-text";
import { API_BASE_URL, CLIENT_SNIPPET, DOC_ENDPOINTS, DOC_ERRORS, DOCS_MARKDOWN_PATH, ERROR_EXAMPLE, json, RESPONSE_TYPE, SUCCESS_EXAMPLE, TODO_FIELDS } from "@/features/docs/docs.utils";

const SECTIONS = [
  { id: "format", label: "Format des réponses" },
  { id: "modele", label: "Modèle Todo" },
  { id: "client", label: "Client TypeScript" },
];

const Page = () => (
  <div className="mx-auto flex w-full max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:py-14">
    <aside className="hidden w-56 shrink-0 lg:block">
      <nav className="sticky top-10 space-y-6 text-sm">
        <div className="space-y-1">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Guide</p>
          {SECTIONS.map((section) => (
            <a key={section.id} href={`#${section.id}`} className="block rounded px-2 py-1 text-muted hover:bg-surface hover:text-foreground">
              {section.label}
            </a>
          ))}
        </div>
        <div className="space-y-1">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Endpoints</p>
          {DOC_ENDPOINTS.map((endpoint) => (
            <a key={endpoint.id} href={`#${endpoint.id}`} className="flex items-center gap-2 rounded px-2 py-1 text-muted hover:bg-surface hover:text-foreground">
              <MethodBadge method={endpoint.method} />
              <span className="truncate">{endpoint.summary}</span>
            </a>
          ))}
        </div>
      </nav>
    </aside>

    <main className="min-w-0 flex-1 space-y-12">
      <header className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">Todo API</h1>
        <p className="max-w-2xl text-lg text-muted">
          API REST de todos partagée entre plusieurs projets de test. Chaque projet envoie sa propre <code className="font-mono text-foreground">source</code> (slug) dans le header{" "}
          <code className="font-mono text-foreground">x-app-source</code> pour cloisonner ses todos.
        </p>
        <ul className="space-y-1 text-muted">
          <li>
            URL de base : <code className="font-mono text-foreground">{API_BASE_URL}</code>
          </li>
          <li>
            Header <code className="font-mono text-foreground">x-app-source</code> obligatoire sur toutes les routes todos : une requête ne voit, ne modifie et ne supprime que les todos de son projet.
          </li>
          <li>JSON, pas d'authentification, CORS ouvert sur /api/*.</li>
          <li>Suppression logique : une todo supprimée n'est plus renvoyée ni modifiable.</li>
        </ul>
        <a href={DOCS_MARKDOWN_PATH} className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-1.5 text-sm hover:border-foreground/30">
          Version Markdown pour agents IA <span className="font-mono text-muted">{DOCS_MARKDOWN_PATH}</span>
        </a>
      </header>

      <section id="format" className="scroll-mt-6 space-y-4">
        <h2 className="text-2xl font-semibold">Format des réponses</h2>
        <p className="text-muted">
          Toutes les routes renvoient la même enveloppe. <code className="font-mono text-foreground">status</code> vaut 1 (succès) ou 0 (erreur) ; le code HTTP est aussi renseigné. En cas d'erreur de
          validation, <code className="font-mono text-foreground">errors</code> regroupe les messages par champ, et les erreurs qui ne visent aucun champ sont sous{" "}
          <code className="font-mono text-foreground">_root</code>.
        </p>
        <CodeBlock language="ts" code={RESPONSE_TYPE} />
        <div className="grid gap-4 xl:grid-cols-2">
          <div className="min-w-0 space-y-2">
            <h3 className="text-sm font-semibold">Succès</h3>
            <CodeBlock language="json" code={json(SUCCESS_EXAMPLE)} />
          </div>
          <div className="min-w-0 space-y-2">
            <h3 className="text-sm font-semibold">Erreur de validation</h3>
            <CodeBlock language="json" code={json(ERROR_EXAMPLE)} />
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface text-xs text-muted">
              <tr>
                <th className="px-3 py-2 font-medium">HTTP</th>
                <th className="px-3 py-2 font-medium">message</th>
                <th className="px-3 py-2 font-medium">Cas</th>
              </tr>
            </thead>
            <tbody>
              {DOC_ERRORS.map((error) => (
                <tr key={error.httpStatus} className="border-t border-border align-top">
                  <td className="px-3 py-2 font-mono">{error.httpStatus}</td>
                  <td className="px-3 py-2">{error.message}</td>
                  <td className="px-3 py-2 text-muted">
                    <RichText text={error.when} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="modele" className="scroll-mt-6 space-y-4">
        <h2 className="text-2xl font-semibold">Modèle Todo</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface text-xs text-muted">
              <tr>
                <th className="px-3 py-2 font-medium">Champ</th>
                <th className="px-3 py-2 font-medium">Type</th>
                <th className="px-3 py-2 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {TODO_FIELDS.map((field) => (
                <tr key={field.name} className="border-t border-border align-top">
                  <td className="px-3 py-2 font-mono text-[13px]">{field.name}</td>
                  <td className="whitespace-nowrap px-3 py-2 font-mono text-[13px] text-muted">{field.type}</td>
                  <td className="px-3 py-2 text-muted">
                    <RichText text={field.description} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-semibold">Endpoints</h2>
        {DOC_ENDPOINTS.map((endpoint) => (
          <EndpointCard key={endpoint.id} endpoint={endpoint} />
        ))}
      </section>

      <section id="client" className="scroll-mt-6 space-y-4 border-t border-border pt-8">
        <h2 className="text-2xl font-semibold">Client TypeScript prêt à copier</h2>
        <p className="text-muted">
          Remplacer <code className="font-mono text-foreground">SOURCE</code> par le slug du projet : il est envoyé dans le header <code className="font-mono text-foreground">x-app-source</code> de
          chaque requête.
        </p>
        <CodeBlock language="ts" code={CLIENT_SNIPPET} />
      </section>
    </main>
  </div>
);

export default Page;
