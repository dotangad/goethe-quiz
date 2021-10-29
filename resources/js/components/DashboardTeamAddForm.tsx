import React from "react";
import { useForm } from "@inertiajs/inertia-react";

interface IDashboardTeamAddFormProps {
  teamAddError?: string;
}

const DashboardTeamAddForm: React.FC<IDashboardTeamAddFormProps> = ({
  teamAddError,
}: IDashboardTeamAddFormProps) => {
  const { setData, post, processing, errors, data, reset } = useForm({
    student_name: "",
    student_mobile: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setData(e.target.name as never, e.target.value as never);

  return (
    <div className="w-full sm:w-1/2 h-96 odd:pr-2 even:pl-2 my-2">
      <div className="bg-white border-none border-gray rounded-lg w-full shadow-sm h-96 p-6 overflow-auto">
        <h1 className="font-bold text-xl mb-4">Add Student</h1>

        <form
          onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault();
            post("/dashboard/teams", {
              preserveScroll: true,
              preserveState: true,
              onSuccess: () => {
                reset("email");
                reset("student_name");
                reset("student_mobile");
              },
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
              value={data.email}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

          <div className="input-group w-full my-4">
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

          {teamAddError && (
            <div className="input-group w-full my-4">
              <div className="error">{teamAddError}</div>
            </div>
          )}

          <div className="input-group w-full flex justify-end">
            <button
              type="submit"
              className={`cursor-pointer bg-gray-100 block rounded-lg p-3 text-center
                              uppercase leading-none font-bold border-2 border-gray-100
                              hover:border-goethe text-xs text-gray-800 transition
                              focus:outline-none focus:border-goethe focus:shadow-none`}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashboardTeamAddForm;
