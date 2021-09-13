import { InertiaLink } from "@inertiajs/inertia-react";
import React from "react";
import Layout from "../../components/Layout";
import Table from "../../components/Table";
import { IUser } from "../../lib/types";

interface ISchoolsProps {
  schools: (IUser & { teams_count: number })[];
}

const Schools: React.FC<ISchoolsProps> = ({ schools }: ISchoolsProps) => {
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
          <h1 className="font-bold text-3xl flex-1">Schools</h1>
        </div>
      </div>

      <div className="max-w-screen-lg min-w-screen-lg overflow-x-auto bg-white rounded-lg shadow-sm flex items-center my-4 mx-auto">
        <Table
          records={schools.map(({ id, name, email, country, teams_count }) => ({
            id: String(id),
            name,
            email,
            country,
            teams: String(teams_count),
            toBtn: `/admin/schools/${id}`,
          }))}
        />
      </div>
    </Layout>
  );
};

export default Schools;
