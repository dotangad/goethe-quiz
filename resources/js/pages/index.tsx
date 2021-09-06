import { Link, usePage } from "@inertiajs/inertia-react";
import React from "react";
import { IPageProps } from "../lib/types";
import useTitle from "../lib/use-title";
import Layout from "../components/Layout";

const Index: React.FC = () => {
  const { props: { authenticated, user } } = usePage<IPageProps>();
  authenticated ? useTitle(user.name) : useTitle("DPS Goethe Quiz");

  return (
    <Layout>
      <div className="flex w-full h-full items-center justify-center">
        <div className="bg-white border-none border-gray-200 rounded-lg w-full max-w-sm p-6 mx-2">
          {!authenticated
            ? <>
              <div>
                <Link
                  href="/auth/school/login"
                  className={`w-full cursor-pointer bg-gray-bg block
                            rounded-lg p-4 text-center uppercase
                            leading-none font-bold border-2 border-gray-bg
                          hover:border-goethe text-sm text-gray-800
                            transition my-5`}
                >
                School Login
                </Link>
                <Link
                  href="/auth/school/register"
                  className={`w-full cursor-pointer bg-gray-bg block
                            rounded-lg p-4 text-center uppercase
                            leading-none font-bold border-2 border-gray-bg
                          hover:border-goethe text-sm text-gray-800
                            transition my-5`}
                >
                School Registration
                </Link>
              </div>
              <div className="mt-10">
                <a
                  className={`w-full cursor-not-allowed bg-gray-400 block
                            rounded-lg p-4 text-center uppercase
                            leading-none font-bold border-2 border-gray-bg
                            text-sm text-gray-600 my-5`}
                >
                Team Login
                </a>
                <a
                  className={`w-full cursor-not-allowed bg-gray-400 block
                            rounded-lg p-4 text-center uppercase
                            leading-none font-bold border-2 border-gray-bg
                            text-sm text-gray-600 my-5`}
                >
                Team Registration
                </a>
              </div>
            </>
            : <div>
              <pre style={{
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
              }}>
                {JSON.stringify(user, null, 2)}
              </pre>
              <div style={{ marginTop: "30px" }}>
                <Link className="button--primary" href="/auth/logout">Logout</Link>
              </div>
            </div>}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
