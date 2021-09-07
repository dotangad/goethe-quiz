import { useForm } from "@inertiajs/inertia-react";
import React from "react";
import Layout from "../../components/Layout";

interface ISchoolLoginProps {
  error?: string;
}

const SchoolLogin: React.FC<ISchoolLoginProps> = ({error}: ISchoolLoginProps) => {
  const { setData, post, processing, errors } = useForm({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setData(e.target.name as never, e.target.value as never);

  return (
    <Layout
      links={[
        {href: "/", label: "Home"},
        {href: "", label: "Rules"}
      ]}>
      <div className="flex w-full h-full items-center justify-center">
        <div className="bg-white border-none border-gray-200 rounded-lg w-full max-w-sm p-6 mx-2 shadow-sm">
          <div className="text-2xl font-bold mb-5">
            Login as Team
          </div>

          <form
            onSubmit={(e: React.SyntheticEvent) => {
              e.preventDefault();
              post("/auth/team/login", {
                preserveState: true,
              });
            }}>
            <div className="input-group my-5">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="student@example.com"
                disabled={processing}
                onChange={handleChange}
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>

            <div className="input-group my-5">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="5eb2658fb820"
                disabled={processing}
                onChange={handleChange}
              />
              {errors.password && <div className="error">{errors.password}</div>}
            </div>

            {error && <div className="input-group my-5">
              <div className="error">{error}</div>
            </div>}

            <div className="input-group mt-5">
              <button type="submit" className="button w-full">Login</button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SchoolLogin;
