import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import { compareAsc } from "date-fns";
import React from "react";
import DashboardSchoolCard from "../components/DashboardSchoolCard";
import DashboardTeamAddForm from "../components/DashboardTeamAddForm";
import Layout from "../components/Layout";
import Table from "../components/Table";
import { IPageProps, IUser } from "../lib/types";


interface IDashboardProps {
  teamAddError?: string;
  teams: IUser[];
}

const Dashboard: React.FC<IDashboardProps> = ({
  teamAddError,
  teams,
}: IDashboardProps) => {
  const {
    props: { regEndDate },
  } = usePage<IPageProps>();
  const regClosed = compareAsc(new Date(), new Date(regEndDate)) === 1;

  return (
    <Layout links={[{ href: "/", label: "Rules" }]}>
      <div className="flex w-full h-full items-center justify-start flex-col px-2 sm:px-20">
        <DashboardSchoolCard />

        <div className="w-full py-6 max-w-screen-lg">
          {!regClosed && (
            <div className="flex justify-center">
              <DashboardTeamAddForm teamAddError={teamAddError} />
            </div>
          )}
          <div className="w-full mt-10">
            <Table
              records={teams.map(
                ({ email, student_name, student_mobile }) => ({
                  name: student_name,
                  email,
                  mobile: student_mobile,
                  "": !regClosed && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        Inertia.post(`/dashboard/teams/${id}/del`, {
                          preserveState: true,
                          preserveScroll: true,
                        });
                      }}
                      className={`cursor-pointer bg-red-500 text-white block rounded-lg p-3 text-center
                              uppercase leading-none font-bold ring-0 ring-red-300
                              hover:ring-4 text-xs transition ml-2
                              focus:outline-none focus:ring-4`}
                    >
                      Delete
                    </button>
                  ),
                })
              )}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
