import React from "react";
import { useForm, usePage } from "@inertiajs/inertia-react";
import { compareAsc } from "date-fns";

import Layout from "../components/Layout";
import { IPageProps, IUser } from "../lib/types";
import DashboardSchoolCard from "../components/DashboardSchoolCard";

interface IDashboardProps {
  teamAddError?: string;
  teams: IUser[];
}

const Dashboard: React.FC<IDashboardProps> = ({
  teamAddError,
  teams,
}: IDashboardProps) => {
  const {
    props: { endDate },
  } = usePage<IPageProps>();
  const ended = compareAsc(new Date(), new Date(endDate)) === 1;
  const { setData, post, processing, errors } = useForm({
    student_1: "",
    student_2: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setData(e.target.name as never, e.target.value as never);

  return (
    <Layout links={[{ href: "", label: "Rules" }]}>
      <div className="flex w-full h-full items-center justify-start flex-col px-2 sm:px-20">
        <DashboardSchoolCard />

        <div className="w-full py-6 max-w-screen-md flex flex-wrap">
          {!ended && (
            <div className="w-full sm:w-1/2 h-96 odd:pr-2 even:pl-2 my-2">
              <div className="bg-white border-none border-gray rounded-lg w-full shadow-sm h-96 p-6 overflow-auto">
                <h1 className="font-bold text-xl mb-4">Add Team</h1>

                <form
                  onSubmit={(e: React.SyntheticEvent) => {
                    e.preventDefault();
                    post("/dashboard/teams", {
                      preserveScroll: true,
                      preserveState: false,
                    });
                  }}
                >
                  <div className="input-group w-full my-4">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      placeholder="team@example.com"
                      className="text-xs p-3"
                      disabled={processing}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <div className="error">{errors.email}</div>
                    )}
                  </div>
                  <div className="input-group w-full my-4">
                    <label htmlFor="student_1">Student 1</label>
                    <input
                      type="text"
                      name="student_1"
                      id="student_1"
                      placeholder="John Doe"
                      className="text-xs p-3"
                      disabled={processing}
                      onChange={handleChange}
                    />
                    {errors.student_1 && (
                      <div className="error">{errors.student_1}</div>
                    )}
                  </div>
                  <div className="input-group w-full my-4">
                    <label htmlFor="student_2">Student 2</label>
                    <input
                      type="text"
                      name="student_2"
                      id="student_2"
                      placeholder="John Doe"
                      className="text-xs p-3"
                      disabled={processing}
                      onChange={handleChange}
                    />
                    {errors.student_2 && (
                      <div className="error">{errors.student_2}</div>
                    )}
                  </div>

                  {teamAddError && (
                    <div className="input-group w-full my-4">
                      <div className="error">{teamAddError}</div>
                    </div>
                  )}

                  <div className="input-group w-full flex justify-end">
                    <button
                      type="submit"
                      className={`cursor-pointer bg-gray-bg block rounded-lg p-3 text-center
                              uppercase leading-none font-bold border-2 border-gray-bg
                              hover:border-goethe text-xs text-gray-800 transition
                              focus:outline-none focus:border-goethe focus:shadow-none`}
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {teams.map(({ id, student_1, student_2, email }, i) => (
            <div
              className="w-full sm:w-1/2 h-96 odd:pr-2 even:pl-2 my-2"
              key={i}
            >
              <div className="bg-white border-none border-gray rounded-lg w-full shadow-sm h-96 p-6">
                <h1 className="font-bold text-xl mb-4">Team {i + 1}</h1>
                <div className="input-group w-full my-4">
                  <label>Email</label>
                  <div className="text-sm py-3">{email}</div>
                </div>
                <div className="input-group w-full my-4">
                  <label>Student 1</label>
                  <div className="text-sm py-3">{student_1}</div>
                </div>
                <div className="input-group w-full my-4">
                  <label>Student 2</label>
                  <div className="text-sm py-3">{student_2}</div>
                </div>

                {!ended && (
                  <div className="input-group flex justify-end">
                    <form
                      onSubmit={(e: React.SyntheticEvent) => {
                        e.preventDefault();
                        post(`/dashboard/teams/del/${id}`, {
                          preserveScroll: true,
                        });
                      }}
                    >
                      <button
                        type="submit"
                        className={`cursor-pointer bg-gray-bg block rounded-lg p-3 text-center
                              uppercase leading-none font-bold border-2 border-gray-bg
                              hover:border-red-600 text-xs text-gray-800 transition: ;
                              focus:outline-none focus:border-red-600 focus:shadow-none`}
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
