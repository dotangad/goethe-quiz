import { Link, useForm } from "@inertiajs/inertia-react";
import React from "react";
import Layout from "../../components/Layout";
import { IUser } from "../../lib/types";
import useTitle from "../../lib/use-title";

interface IVerifyMail {
  error?: string;
  user?: IUser;
}

const Register: React.FC<IVerifyMail> = ({ user, error }) => {
  useTitle("Forgot Password");
  const { setData, post, processing, errors } = useForm({
    password: "",
    // @ts-ignore
    email: user ? user?.email : "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setData(e.target.name as never, e.target.value as never);

  return (
    <Layout links={[{ href: "/", label: "home" }]}>
      <div className="flex items-center justify-center h-full w-full px-5">
        <div className="bg-white w-full max-w-xl p-5 rounded-lg shadow-sm">
          <div className="flex flex-col items-center justify-start w-full text-center">
            <h1 className="text-xl font-bold">Email Verification</h1>
            {error && (
              <div className="mt-5">
                <p>{error}</p>
              </div>
            )}
            {user && (
              <div className="mt-5">
                <form
                  onSubmit={(e: React.SyntheticEvent) => {
                    e.preventDefault();
                    post("/auth/team/reset-password", {
                      preserveState: true,
                    });
                  }}
                >
                  <div className="my-5 input-group">
                    <label htmlFor="password">New Password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="secretpassword"
                      disabled={processing}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <div className="error">{errors.password}</div>
                    )}
                  </div>

                  <div className="mt-5 input-group">
                    <button type="submit" className="w-full button">
                      Reset Password
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
