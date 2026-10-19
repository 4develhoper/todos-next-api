/** @format */

"use client";

import { useState } from "react";
import type { TCopyButtonProps } from "../docs.types";

const CopyButton = ({ value, label = "Copier" }: TCopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-md border border-border bg-background px-2 py-1 text-xs text-muted transition-colors hover:text-foreground"
    >
      {copied ? "Copié" : label}
    </button>
  );
};

export default CopyButton;
