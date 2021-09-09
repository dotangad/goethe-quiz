import { useForm } from "@inertiajs/inertia-react";
import React from "react";
import { IUserWithTeams } from "../lib/types";

interface IAdminSchoolCardProps {
  school: IUserWithTeams;
}

const AdminSchoolCard: React.FC<IAdminSchoolCardProps> = ({
  school,
}: IAdminSchoolCardProps) => {
  const [showChangePasswordForm, setShowChangePasswordForm] =
    React.useState<boolean>(false);
  const { post, data, setData, processing, errors, reset } = useForm({
    password: "",
  });
  const show = {
    Email: school.email,
    Address: school.address,
    Country: school.country,
    Phone: school.phone,
    Principal: school.principal,
    "Teacher Incharge": school.teacher_incharge,
  };

  return (
    <div className="bg-white border-none rounded-lg w-full p-6 shadow-sm max-w-screen-md">
      <h1 className="text-3xl font-bold mb-5">{school.name}</h1>
      <div className="flex flex-wrap items-start">
        {Object.entries(show).map(([label, value], i) => (
          <div
            className="input-group my-3 odd:pr-3 even:pl-3 w-full sm:w-1/2"
            key={i}
          >
            <label>{label}</label>
            <div className="w-full">{value}</div>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-end items-center mt-5">
        {showChangePasswordForm ? (
          <form
            className="flex flex-1 items-center"
            onSubmit={(e: React.SyntheticEvent) => {
              e.preventDefault();
              post(`/admin/schools/${school.id}/changepwd`, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                  setShowChangePasswordForm(false);
                  reset();
                },
              });
            }}
          >
            <a
              className="button"
              style={{
                padding: "0",
                height: "3rem",
                width: "3rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                setShowChangePasswordForm(false);
                reset();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </a>
            {errors.password ? (
              <div className="flex-1 text-red-500 text-sm px-1">
                {errors.password} Refresh page to try again.
              </div>
            ) : (
              <input
                type="text"
                name="password"
                placeholder="New Password"
                disabled={processing}
                value={data.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setData("password", e.target.value)
                }
                className="p-3 border-2 border-gray-bg rounded-lg focus:outline-none focus:border-goethe mx-2 flex-1"
              />
            )}
            <button type="submit" className="button" disabled={processing}>
              Change Password
            </button>
          </form>
        ) : (
          <a className="button" onClick={() => setShowChangePasswordForm(true)}>
            Change Password
          </a>
        )}
        <form
          onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault();
            post(`/admin/schools/${school.id}/login`);
          }}
        >
          <button type="submit" className="button ml-2">
            Login as School
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSchoolCard;
