import React from "react";
import { useForm, usePage } from "@inertiajs/inertia-react";
import { compareAsc } from "date-fns";

import { IPageProps, IUser } from "../lib/types";

interface IDashboardTeamProps {
  team: IUser;
  i: number;
}

const DashboardTeam: React.FC<IDashboardTeamProps> = ({
  team: { id, email, student_1, student_2 },
  i,
}: IDashboardTeamProps) => {
  const [editing, setEditing] = React.useState<boolean>(false);
  const {
    props: { endDate, startDate },
  } = usePage<IPageProps>();
  const started = compareAsc(new Date(), new Date(startDate)) === 1;
  const ended = compareAsc(new Date(), new Date(endDate)) === 1;
  const { setData, data, post, processing, errors } = useForm({
    student_1,
    student_2,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setData(e.target.name as never, e.target.value as never);

  return (
    <div className="w-full sm:w-1/2 h-96 sm:odd:pr-2 sm:even:pl-2 my-2" key={i}>
      <div className="bg-white border-none border-gray rounded-lg w-full shadow-sm h-96 p-6 overflow-y-auto">
        {!editing ? (
          <>
            <h1 className="font-bold text-xl mb-4">Team {i + 1}</h1>
            <div className="input-group w-full my-4">
              <label>Email</label>
              <div className="text-sm py-3">{email}</div>
            </div>
            <div className="input-group w-full my-4">
              <label>Student 1</label>
              <div className="text-sm py-3">{data.student_1}</div>
            </div>
            <div className="input-group w-full my-4">
              <label>Student 2</label>
              <div className="text-sm py-3">{data.student_2}</div>
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
            <h1 className="font-bold text-xl mb-2">Team {i + 1}</h1>
            <div className="input-group w-full my-2">
              <label>Email</label>
              <div className="text-sm pt-2">{email}</div>
            </div>
            <div className="input-group w-full my-2">
              <label htmlFor="student_1">Student 1</label>
              <input
                type="text"
                name="student_1"
                id="student_1"
                placeholder="John Doe"
                className="text-xs p-3"
                value={data.student_1}
                disabled={processing}
                onChange={handleChange}
              />
              {errors.student_1 && (
                <div className="error">{errors.student_1}</div>
              )}
            </div>
            <div className="input-group w-full my-2">
              <label htmlFor="student_2">Student 2</label>
              <input
                type="text"
                name="student_2"
                id="student_2"
                placeholder="John Doe"
                className="text-xs p-3"
                value={data.student_2}
                disabled={processing}
                onChange={handleChange}
              />
              {errors.student_2 && (
                <div className="error">{errors.student_2}</div>
              )}
            </div>

            <div className="input-group w-full my-2">
              <button
                type="submit"
                className={`cursor-pointer bg-gray-bg block rounded-lg p-3 text-center
                            uppercase leading-none font-bold border-2 border-gray-bg
                            hover:border-goethe text-xs text-gray-800 transition w-full
                            focus:outline-none focus:border-goethe focus:shadow-none`}
              >
                Save
              </button>
            </div>
          </form>
        )}

        {!ended && (
          <div className="input-group flex justify-end">
            <a
              onClick={() => setEditing((x) => !x)}
              className={`cursor-pointer bg-gray-bg block rounded-lg p-3 text-center
                          uppercase leading-none font-bold border-2 border-gray-bg
                          hover:border-goethe text-xs text-gray-800 transition ml-2
                          focus:outline-none focus:border-goethe focus:shadow-none`}
            >
              {editing ? "Reset" : "Edit"}
            </a>
            {!started && (
              <form
                onSubmit={(e: React.SyntheticEvent) => {
                  e.preventDefault();
                  post(`/dashboard/teams/${id}/del`, {
                    preserveScroll: true,
                  });
                }}
              >
                <button
                  type="submit"
                  className={`cursor-pointer bg-gray-bg block rounded-lg p-3 text-center
                              uppercase leading-none font-bold border-2 border-gray-bg
                              hover:border-red-600 text-xs text-gray-800 transition ml-2
                              focus:outline-none focus:border-red-600 focus:shadow-none`}
                >
                  Delete
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardTeam;
