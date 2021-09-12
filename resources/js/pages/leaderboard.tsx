import { usePage } from "@inertiajs/inertia-react";
import React from "react";
import Layout from "../components/Layout";
import Table from "../components/Table";
import { IPageProps, IUser } from "../lib/types";

interface ILeaderboardProps {
  users: {
    id: number;
    question_id: number;
    student_1: string;
    student_2: string;
    school: string;
  }[];
}

const Leaderboard: React.FC<ILeaderboardProps> = ({
  users,
}: ILeaderboardProps) => {
  const {
    props: { user },
  } = usePage<IPageProps>();

  return (
    <Layout
      links={(
        {
          team: [{ href: "/play", label: "Play" }],
          school: [{ href: "/dashboard", label: "Dashboard" }],
          admin: [{ href: "/admin", label: "Admin" }],
        }[user.type as never] as { href: string; label: string }[]
      ).concat([{ href: "", label: "Rules" }])}
    >
      <div className="flex w-full h-full items-center justify-start flex-col">
        {/*<div className="bg-white border-none border-gray-200 rounded-lg w-full max-w-screen-lg p-6 mx-2 shadow-sm">
          <h1 className="font-bold text-2xl flex-1">Leaderboard</h1>
          </div>*/}

        <div className="w-full max-w-screen-lg overflow-x-auto bg-white rounded-lg shadow-sm flex items-center my-4 mx-auto">
          <Table
            records={users.map(({ id, school, student_1, student_2 }, i) => ({
              "#": String(i + 1),
              school: school,
              "student 1": student_1,
              "student 2": student_2,
              ...(user.type === "admin" ? { toBtn: `/admin/teams/${id}` } : {}),
            }))}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;
