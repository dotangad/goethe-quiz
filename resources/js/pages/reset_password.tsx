import { useForm } from "@inertiajs/inertia-react";
import React from "react";
import Layout from "../components/Layout";

interface IResetPasswordProps {
  error?: string;
  new_password?: string;
  user_reset_string?: string;
}

const ResetPassword: React.FC<IResetPasswordProps> = ({
  error,
  new_password,
  user_reset_string,
}: IResetPasswordProps) => {
  const { post, processing } = useForm({
    user_unique_string: user_reset_string,
  });
  return (
    <Layout links={[]}>
      <div className="flex w-full h-full items-center justify-center">
        <div className="bg-white rounded-lg w-full max-w-screen-md py-6 px-3 sm:p-6 mx-2 shadow-sm flex flex-col items-center">
          <div className="text-2xl font-bold mb-5">Reset Password</div>
          {error ? (
            <p className="text-red">{error}</p>
          ) : new_password ? (
            <p>
              Your new password is <b>{new_password}</b>
            </p>
          ) : (
            <form
              onSubmit={(e: React.SyntheticEvent) => {
                e.preventDefault();
                post("/reset/password");
              }}
            >
              <button
                type="submit"
                disabled={processing}
                className="button danger"
              >
                Confirm
              </button>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ResetPassword;
