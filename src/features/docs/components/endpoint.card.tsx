/** @format */

import type { TEndpointCardProps } from "../docs.types";
import { json, toCurl } from "../docs.utils";
import CodeBlock from "./code.block";
import FieldsTable from "./fields.table";
import MethodBadge from "./method.badge";
import RichText from "./rich-text";

const EndpointCard = ({ endpoint }: TEndpointCardProps) => (
  <article id={endpoint.id} className="scroll-mt-6 space-y-4 border-t border-border pt-8">
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">{endpoint.summary}</h3>
      <div className="flex items-center gap-2">
        <MethodBadge method={endpoint.method} />
        <code className="font-mono text-sm">{endpoint.path}</code>
      </div>
      <p className="text-muted">
        <RichText text={endpoint.description} />
      </p>
    </div>

    {endpoint.headers && <FieldsTable title="Headers" fields={endpoint.headers} />}
    {endpoint.params && <FieldsTable title="Paramètres d'URL" fields={endpoint.params} />}
    {endpoint.query && <FieldsTable title="Query string" fields={endpoint.query} />}
    {endpoint.body && <FieldsTable title="Corps JSON" fields={endpoint.body} />}

    <div className="grid gap-4 xl:grid-cols-2">
      <div className="min-w-0 space-y-2">
        <h4 className="text-sm font-semibold">Exemple</h4>
        <CodeBlock language="bash" code={toCurl(endpoint)} />
      </div>
      <div className="min-w-0 space-y-2">
        <h4 className="text-sm font-semibold">Réponse {endpoint.httpStatus}</h4>
        <CodeBlock language="json" code={json(endpoint.exampleResponse)} />
      </div>
    </div>

    <ul className="space-y-1 text-sm text-muted">
      {endpoint.errors.map((error) => (
        <li key={error}>
          <span className="text-foreground">Erreur</span> {error}
        </li>
      ))}
    </ul>
  </article>
);

export default EndpointCard;
