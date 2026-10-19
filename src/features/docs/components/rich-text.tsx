/** @format */

import type { TRichTextProps } from "../docs.types";

/** Rend les segments entre backticks en `<code>` (même syntaxe que la version Markdown). */
const RichText = ({ text }: TRichTextProps) => (
  <>
    {text.split(/(`[^`]+`)/).map((part, index) =>
      part.startsWith("`") && part.endsWith("`") ? (
        // biome-ignore lint/suspicious/noArrayIndexKey: segments statiques, ordre fixe
        <code key={index} className="rounded bg-surface px-1 py-0.5 font-mono text-[0.85em] text-foreground">
          {part.slice(1, -1)}
        </code>
      ) : (
        part
      ),
    )}
  </>
);

export default RichText;
