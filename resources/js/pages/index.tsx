import React from "react";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import { compareAsc, subDays } from "date-fns";
import { IPageProps } from "../lib/types";
import useTitle from "../lib/use-title";
import Layout from "../components/Layout";

const Index: React.FC = () => {
  const {props: { startDate }} = usePage<IPageProps>();
  useTitle("DPS Goethe Quiz");

       const teamLoginOpen = compareAsc(subDays(new Date(startDate), 2), new Date()) === -1;

  return (
    <Layout
      links={[
        {href: "", label: "Rules"},
      ]}>
      <div className="flex w-full h-full items-center justify-center">
        <div className="bg-white border-none border-gray-200 rounded-lg w-full max-w-sm p-6 mx-2 shadow-sm">
          <div>
            <InertiaLink
              href="/auth/school/login"
              className="w-full button my-5"
            >
                School Login
            </InertiaLink>
            <InertiaLink
              href="/auth/school/register"
              className="w-full button my-5"
            >
                School Registration
            </InertiaLink>
          </div>
          <div className="mt-10">
            {!teamLoginOpen
              ? <a
                className={`w-full cursor-not-allowed bg-gray-400 block
                            rounded-lg p-4 text-center uppercase
                            leading-none font-bold border-2 border-gray-bg
                            text-sm text-gray-600 my-5`}
              >
                Team Login
              </a>
              : <InertiaLink href="/auth/team/login" className="w-full button my-5">Team Login</InertiaLink>
            }
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
