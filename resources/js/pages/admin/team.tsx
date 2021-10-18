import { InertiaLink } from "@inertiajs/inertia-react";
import React from "react";
import _ from "lodash";
import Layout from "../../components/Layout";
import Table from "../../components/Table";
import { IUser, IUserAttempt } from "../../lib/types";

interface ITeamProps {
  team: IUser;
  attempts: IUserAttempt[];
}

const Team: React.FC<ITeamProps> = ({ team, attempts }: ITeamProps) => {
  console.log({ team, attempts });
  return (
    <Layout links={[{ href: "/admin", label: "Home" }]}>
      <div className="w-full sm:max-w-screen-md mx-auto">
        <div className="bg-white border-none rounded-lg w-full p-6 shadow-sm max-w-screen-md mb-5">
          <div className="w-full flex items-center justify-start">
            <InertiaLink
              href="/admin/schools"
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
            <h1 className="font-bold text-3xl flex-1">Team {team.id}</h1>
          </div>
          <div className="flex flex-wrap items-start">
            {Object.entries({
              email: team.email,
              student_1: team.student_1,
              student_2: team.student_1,
              last_solved: team.last_solved,
              logged_in: team.logged_in ? "Yes" : "No",
            }).map(([label, value], i) => (
              <div
                className="input-group my-3 px-0 sm:odd:pr-3 sm:even:pl-3 w-full sm:w-1/2"
                key={i}
              >
                <label>{label}</label>
                <div className="w-full">{value || ""}</div>
              </div>
            ))}
            <div className="input-group my-3 sm:odd:pr-3 sm:even:pl-3 w-full sm:w-1/2">
              <label>School</label>
              <div className="w-full">
                <InertiaLink
                  href={`/admin/schools/${team.school?.id}`}
                  className="font-semibold"
                >
                  {team.school?.name || ""}
                </InertiaLink>
              </div>
            </div>
          </div>
        </div>

        {attempts.length === 0 ? (
          <div className="my-20 font-extrabold text-gray-200 text-4xl uppercase text-center">
            No attempts yet
          </div>
        ) : (
          <Table
            records={attempts
              .map(({ attempt, question_id, created_at }) => ({
                question: String(question_id),
                attempt,
                created_at,
              }))
              .reverse()}
          />
        )}
      </div>
    </Layout>
  );
};

export default Team;
