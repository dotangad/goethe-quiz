import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

interface ITableProps {
  records: { [key: string]: string }[];
}

const Table: React.FC<ITableProps> = ({ records }: ITableProps) => {
  const headers = Object.keys(records[0]);

  return (
    <table className="w-full border-collapse border-1 border-gray-300 divide-y divide-gray-100">
      <thead>
        <tr className="bg-gray-200 rounded-t-lg text-left uppercase text-xs">
          {headers.map((header, i) => (
            <th
              key={i}
              className={
                "p-4" +
                (i === 0
                  ? " rounded-tl-lg"
                  : i === headers.length - 1
                    ? " rounded-tr-lg"
                    : "")
              }
            >
              {header === "toBtn" ? "" : header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {records.map((record, i) => (
          <tr key={i} className="even:bg-gray-100">
            {Object.entries(record).map(([key, val], i) =>
              key === "toBtn" ? (
                <td className="cursor-pointer p-4 text-right min-w-12" key={i}>
                  <InertiaLink
                    href={val}
                    className="bg-gray-200 h-8 w-8 flex justify-center items-center font-xs rounded-lg"
                  >
                    -&gt;
                  </InertiaLink>
                </td>
              ) : (
                <td className="p-4" key={i}>
                  {val}
                </td>
              )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
