/** @format */

import type { TCodeBlockProps } from "../docs.types";
import CopyButton from "./copy.button";

const CodeBlock = ({ code, language }: TCodeBlockProps) => (
  <div className="overflow-hidden rounded-lg border border-border bg-surface">
    <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
      <span className="font-mono text-xs text-muted">{language}</span>
      <CopyButton value={code} />
    </div>
    <pre className="overflow-x-auto p-3 font-mono text-[13px] leading-relaxed">
      <code>{code}</code>
    </pre>
  </div>
);

export default CodeBlock;
