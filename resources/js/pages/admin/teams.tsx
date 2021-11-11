import { InertiaLink } from "@inertiajs/inertia-react";
import React from "react";
import { useTable } from "react-table";
import Layout from "../../components/Layout";
import Table from "../../components/Table";
import { IUser } from "../../lib/types";

interface ITeamsProps {
  teams: IUser[];
}

const Teams: React.FC<ITeamsProps> = ({ teams }: ITeamsProps) => {
  const data = React.useMemo(() => teams);
  const columns = React.useMemo(() => [
    { Header: "ID", accessor: "id" },
    {
      Header: "School",
      accessor: (row) => `${row.school.name}(${row.school.id})`,
    },
    { Header: "Email", accessor: "email" },
    { Header: "Name", accessor: "student_name" },
  ]);

  const table = useTable({ data, columns });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    table;

  return (
    <Layout links={[{ href: "/admin", label: "Home" }]}>
      <div className="w-full sm:max-w-screen-lg mx-auto">
        <div className="w-full p-6 bg-white rounded-lg shadow-sm flex items-center">
          <InertiaLink
            href="/admin"
            className="flex justify-center items-center mr-3"
          >
            <div className="flex justify-center items-center bg-gray-bg p-3 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </div>
          </InertiaLink>
          <h1 className="font-bold text-3xl flex-1">Students</h1>
        </div>
      </div>

      <div className="max-w-screen-lg min-w-screen-lg overflow-x-auto bg-white rounded-lg shadow-sm flex items-center my-4 mx-auto">
        <table
          className="w-full border-collapse border-1 border-gray-300 divide-y divide-gray-100"
          {...getTableProps()}
        >
          <thead>
            {
              // Loop over the header rows
              headerGroups.map((headerGroup) => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column) => (
                      // Apply the header cell props
                      <th {...column.getHeaderProps()} className="p-4">
                        {
                          // Render the header
                          column.render("Header")
                        }
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          {/* Apply the table body props */}
          <tbody {...getTableBodyProps()}>
            {
              // Loop over the table rows
              rows.map((row) => {
                // Prepare the row for display
                prepareRow(row);
                return (
                  // Apply the row props
                  <tr className="even:bg-gray-100" {...row.getRowProps()}>
                    {
                      // Loop over the rows cells
                      row.cells.map((cell) => {
                        // Apply the cell props
                        return (
                          <td className="p-4" {...cell.getCellProps()}>
                            {
                              // Render the cell contents
                              cell.render("Cell")
                            }
                          </td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Teams;
