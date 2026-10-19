/** @format */

import type { TMethodBadgeProps } from "../docs.types";
import { METHOD_STYLES } from "../docs.utils";

const MethodBadge = ({ method }: TMethodBadgeProps) => (
  <span className={`inline-block w-16 shrink-0 rounded px-1.5 py-0.5 text-center font-mono text-xs font-semibold ${METHOD_STYLES[method]}`}>{method}</span>
);

export default MethodBadge;
