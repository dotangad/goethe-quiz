import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import React from "react";
import Layout from "../../components/Layout";
import AdminSchoolCard from "../../components/AdminSchoolCard";
import { IUser } from "../../lib/types";

interface ISchoolProps {
  school: IUser;
}

const School: React.FC<ISchoolProps> = ({ school }: ISchoolProps) => {
  const { post } = useForm({});

  return (
    <Layout links={[{ href: "/admin", label: "Home" }]}>
      <div className="w-full sm:max-w-screen-md mx-auto">
        <AdminSchoolCard school={school} />
        <div className="w-full py-6 max-w-screen-md flex flex-wrap">
          {school.teams?.map(({ id, student_1, student_2, email }, i) => (
            <div
              className="w-full sm:w-1/2 h-96 odd:pr-2 even:pl-2 my-2"
              key={i}
            >
              <div className="bg-white border-none border-gray rounded-lg w-full shadow-sm h-96 p-6">
                <InertiaLink href={`/admin/teams/${id}`}>
                  <h1 className="font-bold text-xl mb-4">Team {i + 1}</h1>
                </InertiaLink>
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

                <div className="input-group flex justify-end">
                  <form
                    onSubmit={(e: React.SyntheticEvent) => {
                      e.preventDefault();
                      post(`/admin/teams/${id}/resetpwd`, {
                        preserveScroll: true,
                      });
                    }}
                  >
                    <button
                      type="submit"
                      className={`cursor-pointer bg-gray-bg block rounded-lg p-3 text-center
                              uppercase leading-none font-bold border-2 border-gray-bg
                              hover:border-goethe text-xs text-gray-800 transition
                              focus:outline-none focus:border-goethe focus:shadow-none`}
                    >
                      Reset Password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default School;