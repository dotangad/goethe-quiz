import { useForm } from "@inertiajs/inertia-react";
import React from "react";
import Layout from "../../components/Layout";

const TeamRegister: React.FC = () => {
  const { setData, post, processing, errors, data } = useForm({
    name: "",
    email: "",
    password: "",
    "confirm-password": "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setData(e.target.name as never, e.target.value as never);

  return (
    <Layout
      links={[
        { href: "/", label: "Rules" },
        { href: "/auth/school/login", label: "Login" },
      ]}
    >
      <div className="flex w-full h-full items-center justify-center">
        <div className="bg-white border-none border-gray-200 rounded-lg w-full max-w-3xl min-w-sm p-6 mx-2 shadow-sm">
          <div className="text-2xl font-bold mb-5">Register</div>

          <form
            className="flex flex-col justify-center items-center"
            onSubmit={(e: React.SyntheticEvent) => {
              e.preventDefault();
              post("/auth/team/register", {
                preserveState: true,
              });
              console.log("register clicked");
            }}
          >
            <div className="flex flex-wrap">
              <div className="input-group my-3 w-full sm:w-1/2 sm:px-2">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="John Doe"
                  disabled={processing}
                  onChange={handleChange}
                />
                {errors.name && <div className="error">{errors.name}</div>}
              </div>
              <div className="input-group my-3 w-full sm:w-1/2 sm:px-2">
                <label htmlFor="email">Email (Login)</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="email@example.com"
                  disabled={processing}
                  onChange={handleChange}
                />
                {errors.email && <div className="error">{errors.email}</div>}
              </div>

              <div className="input-group my-3 w-full sm:w-1/2 sm:px-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="5eb2658fb820"
                  disabled={processing}
                  onChange={handleChange}
                />
                {errors.password && (
                  <div className="error">{errors.password}</div>
                )}
              </div>

              <div className="input-group my-3 w-full sm:w-1/2 sm:px-2">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="5eb2658fb820"
                  disabled={processing}
                  onChange={handleChange}
                />
                {errors["confirm-password"] && (
                  <div className="error">{errors["confirm-password"]}</div>
                )}
              </div>
            </div>

            <div className="input-group mt-3 w-full sm:w-1/2 sm:px-2 flex justify-center items-center">
              <label style={{ color: "white" }}>.</label>
              <button type="submit" className="button w-full">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default TeamRegister;
