import React from "react";
import { useForm, usePage } from "@inertiajs/inertia-react";
import { compareAsc } from "date-fns";

import { IPageProps, IUser } from "../lib/types";

interface IDashboardTeamProps {
  team: IUser;
  i: number;
}

const DashboardTeam: React.FC<IDashboardTeamProps> = ({
  team: { id, email, student_name, student_mobile, reset_link },
  i,
}: IDashboardTeamProps) => {
  const [editing, setEditing] = React.useState<boolean>(false);
  const {
    props: { regEndDate },
  } = usePage<IPageProps>();
  const regClosed = compareAsc(new Date(), new Date(regEndDate)) === 1;
  const { setData, data, post, processing, errors } = useForm({
    student_name,
    student_mobile,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setData(e.target.name as never, e.target.value as never);

  return (
    <div className="w-full sm:w-1/2 h-96 sm:odd:pr-2 sm:even:pl-2 my-2" key={i}>
      <div className="bg-white rounded-lg w-full shadow-sm h-96 p-6 overflow-y-auto">
        {!editing ? (
          <>
            <h1 className="font-bold text-xl mb-4">{student_name}</h1>
            <div className="input-group w-full my-4">
              <label>Email</label>
              <div className="text-sm py-3">{email}</div>
            </div>
            <div className="input-group w-full my-4">
              <label>Student Name</label>
              <div className="text-sm py-3">{data.student_name}</div>
            </div>
            <div className="input-group w-full my-4">
              <label>Student Mobile</label>
              <div className="text-sm py-3">{data.student_mobile}</div>
            </div>
          </>
        ) : (
          <form
            onSubmit={(e: React.SyntheticEvent) => {
              e.preventDefault();
              post(`/dashboard/teams/${id}`, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => setEditing(false),
              });
            }}
          >
            <h1 className="font-bold text-xl mb-2">{student_name}</h1>
            <div className="input-group w-full my-2">
              <label>Email</label>
              <div className="text-sm pt-2">{email}</div>
            </div>

            <div className="input-group w-full my-2">
              <label htmlFor="student_name">Student Name</label>
              <input
                type="text"
                name="student_name"
                id="student_name"
                placeholder="John Doe"
                className="text-xs p-3"
                disabled={processing}
                onChange={handleChange}
                value={data.student_name}
              />
              {errors.student_name && (
                <div className="error">{errors.student_name}</div>
              )}
            </div>

            <div className="input-group w-full my-4">
              <label htmlFor="student_mobile">Student Mobile</label>
              <input
                type="text"
                name="student_mobile"
                id="student_mobile"
                placeholder="1231231231"
                className="text-xs p-3"
                disabled={processing}
                onChange={handleChange}
                value={data.student_mobile}
              />
              {errors.student_mobile && (
                <div className="error">{errors.student_mobile}</div>
              )}
            </div>

            <div className="input-group w-full my-2">
              <button
                type="submit"
                className={`cursor-pointer bg-gray-100 block rounded-lg p-3 text-center
                            uppercase leading-none font-bold border-2 border-gray-100
                            hover:border-goethe text-xs text-gray-800 transition w-full
                            focus:outline-none focus:border-goethe focus:shadow-none`}
              >
                Save
              </button>
            </div>
            <p>Reset Password Link: {reset_link}</p>
          </form>
        )}

        {!regClosed && (
          <div className="input-group flex justify-end">
            <a
              onClick={() => setEditing((x) => !x)}
              className={`cursor-pointer bg-gray-100 block rounded-lg p-3 text-center
                          uppercase leading-none font-bold border-2 border-gray-100
                          hover:border-goethe text-xs text-gray-800 transition ml-2
                          focus:outline-none focus:border-goethe focus:shadow-none`}
            >
              {editing ? "Reset" : "Edit"}
            </a>
            <form
              onSubmit={(e: React.SyntheticEvent) => {
                e.preventDefault();
                post(`/dashboard/teams/${id}/del`, {
                  preserveState: true,
                  preserveScroll: true,
                });
              }}
            >
              <button
                type="submit"
                className={`cursor-pointer bg-gray-100 block rounded-lg p-3 text-center
                              uppercase leading-none font-bold border-2 border-gray-100
                              hover:border-red-600 text-xs text-gray-800 transition ml-2
                              focus:outline-none focus:border-red-600 focus:shadow-none`}
              >
                Delete
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardTeam;
