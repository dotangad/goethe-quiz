import { Link, usePage } from "@inertiajs/inertia-react";
import React from "react";
import { IPageProps } from "../lib/types";
import useTitle from "../lib/use-title";
import Layout from "../components/Layout";

const Index: React.FC = () => {
  const { props: { authenticated, user } } = usePage<IPageProps>();
  useTitle("DPS Goethe Quiz");

  return (
    <Layout
      links={[
        {href: "", label: "Rules"},
      ]}>
      <div className="flex w-full h-full items-center justify-center">
        <div className="bg-white border-none border-gray-200 rounded-lg w-full max-w-sm p-6 mx-2 shadow-sm">
          {!authenticated
            ? <>
              <div>
                <Link
                  href="/auth/school/login"
                  className="w-full button my-5"
                >
                School Login
                </Link>
                <Link
                  href="/auth/school/register"
                  className="w-full button my-5"
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
            </div>}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
