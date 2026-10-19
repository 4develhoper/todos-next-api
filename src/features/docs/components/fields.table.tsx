/** @format */

import type { TFieldsTableProps } from "../docs.types";
import RichText from "./rich-text";

const FieldsTable = ({ title, fields }: TFieldsTableProps) => (
  <div>
    <h4 className="mb-2 text-sm font-semibold">{title}</h4>
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-sm">
        <thead className="bg-surface text-xs text-muted">
          <tr>
            <th className="px-3 py-2 font-medium">Nom</th>
            <th className="px-3 py-2 font-medium">Type</th>
            <th className="px-3 py-2 font-medium">Requis</th>
            <th className="px-3 py-2 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field) => (
            <tr key={field.name} className="border-t border-border align-top">
              <td className="px-3 py-2 font-mono text-[13px]">{field.name}</td>
              <td className="whitespace-nowrap px-3 py-2 font-mono text-[13px] text-muted">{field.type}</td>
              <td className="px-3 py-2">{field.required ? "oui" : "non"}</td>
              <td className="px-3 py-2 text-muted">
                <RichText text={field.description} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default FieldsTable;
