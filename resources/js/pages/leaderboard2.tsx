import { usePage } from "@inertiajs/inertia-react";
import React from "react";
import Layout from "../components/Layout";
import Table from "../components/Table";
import { IPageProps, IUser } from "../lib/types";

interface ILeaderboard2Props {
  questions: {
    id: number;
    text: string;
    users_count: number;
  }[];
}

const Leaderboard2: React.FC<ILeaderboard2Props> = ({
  questions,
}: ILeaderboard2Props) => {
  const {
    props: { authenticated, user },
  } = usePage<IPageProps>();

  return (
    <Layout
      links={(
        {
          team: [{ href: "/play", label: "Play" }],
          school: [{ href: "/dashboard", label: "Dashboard" }],
          admin: [{ href: "/admin", label: "Admin" }],
          default: [],
        }[(user?.type as never) || "default"] as {
          href: string;
          label: string;
        }[]
      ).concat([{ href: "/", label: "Rules" }])}
    >
      <div className="flex w-full h-full items-center justify-start flex-col">
        {/*<div className="bg-white border-none border-gray-200 rounded-lg w-full max-w-screen-lg p-6 mx-2 shadow-sm">
          <h1 className="font-bold text-2xl flex-1">Leaderboard2</h1>
          </div>*/}

        <div className="w-full max-w-screen-lg overflow-x-auto bg-white rounded-lg shadow-sm flex items-center my-4 mx-auto">
          <Table
            records={questions.map(({ id, text, users_count }, i) => ({
              question: id,
              text,
              students: users_count,
            }))}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard2;
