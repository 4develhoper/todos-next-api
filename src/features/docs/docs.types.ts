/** @format */

export type THttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

export type TDocField = {
  name: string;
  type: string;
  required: boolean;
  description: string;
};

export type TDocEndpoint = {
  id: string;
  method: THttpMethod;
  path: string;
  summary: string;
  description: string;
  headers?: TDocField[];
  params?: TDocField[];
  query?: TDocField[];
  body?: TDocField[];
  /** Headers envoyés dans l'exemple. */
  exampleHeaders?: Record<string, string>;
  /** Corps JSON envoyé dans l'exemple. */
  exampleBody?: unknown;
  /** Chemin appelé dans l'exemple (avec query string ou id réels). */
  examplePath: string;
  exampleResponse: unknown;
  httpStatus: number;
  errors: string[];
};

export type TDocError = {
  httpStatus: number;
  message: string;
  when: string;
};

export type TFieldsTableProps = {
  title: string;
  fields: TDocField[];
};

export type TCodeBlockProps = {
  code: string;
  language: string;
};

export type TEndpointCardProps = {
  endpoint: TDocEndpoint;
};

export type TRichTextProps = {
  text: string;
};

export type TCopyButtonProps = {
  value: string;
  label?: string;
};

export type TMethodBadgeProps = {
  method: THttpMethod;
};
