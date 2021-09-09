import React from "react";
import { usePage } from "@inertiajs/inertia-react";
import { compareAsc } from "date-fns";

import Layout from "../components/Layout";
import { IPageProps, IUser } from "../lib/types";
import DashboardSchoolCard from "../components/DashboardSchoolCard";
import DashboardTeamAddForm from "../components/DashboardTeamAddForm";
import DashboardTeam from "../components/DashboardTeam";

interface IDashboardProps {
  teamAddError?: string;
  teams: IUser[];
}

const Dashboard: React.FC<IDashboardProps> = ({
  teamAddError,
  teams,
}: IDashboardProps) => {
  const { props: { endDate } } = usePage<IPageProps>();
  const ended = compareAsc(new Date(), new Date(endDate)) === 1;
  return (
    <Layout links={[{ href: "", label: "Rules" }]}>
      <div className="flex w-full h-full items-center justify-start flex-col px-2 sm:px-20">
        <DashboardSchoolCard />

        <div className="w-full py-6 max-w-screen-md flex flex-wrap">
          {!ended && <DashboardTeamAddForm teamAddError={teamAddError} />}
          {teams.map((team, i) => <DashboardTeam team={team} i={i} key={i} />)}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
