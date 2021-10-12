import React from "react";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import { compareAsc, subDays } from "date-fns";
import { IPageProps } from "../lib/types";
import useTitle from "../lib/use-title";
import Layout from "../components/Layout";

const Index: React.FC = () => {
  const {
    props: { authenticated, user, regDate, startDate, endDate },
  } = usePage<IPageProps>();
  useTitle("DPS Goethe Quiz");

  const teamLoginOpen =
    compareAsc(subDays(new Date(startDate), 2), new Date()) === -1;
  const schoolRegOpen = compareAsc(new Date(regDate), new Date()) === -1;

  return (
    <Layout
      links={
        {
          team: [{ href: "/play", label: "Play" }],
          school: [{ href: "/dashboard", label: "Dashboard" }],
          admin: [{ href: "/admin", label: "Admin" }],
          default: [],
        }[(user?.type as never) || "default"] as {
          href: string;
          label: string;
        }[]
      }
    >
      <div className="flex w-full h-full items-center justify-center">
        <div className="bg-white rounded-lg w-full max-w-screen-md p-6 mx-2 shadow-sm">
          <div>
            <h1 className="font-bold text-xl text-center my-3">
              DPS Goethe Quiz
            </h1>
            <ul className="list-disc pl-5">
              {!authenticated && schoolRegOpen && (
                <li className="my-3">
                  For schools:
                  <div className="flex flex-wrap justify-around">
                    <div className="w-full sm:w-1/2 sm:odd:pr-3 sm:even:pl-3 mt-2">
                      <InertiaLink
                        href="/auth/school/login"
                        className="w-full button"
                      >
                        School Login
                      </InertiaLink>
                    </div>
                    <div className="w-full sm:w-1/2 sm:odd:pr-3 sm:even:pl-3 mt-2">
                      <InertiaLink
                        href="/auth/school/register"
                        className="w-full button"
                      >
                        School Registration
                      </InertiaLink>
                    </div>
                  </div>
                </li>
              )}

              {!authenticated && teamLoginOpen && (
                <li className="my-3">
                  For teams:
                  <div className="flex flex-wrap justify-start">
                    <div className="w-full sm:w-1/2 sm:odd:pr-3 sm:even:pl-3 mt-2">
                      <InertiaLink
                        href="/auth/team/login"
                        className="w-full button"
                      >
                        Team Login
                      </InertiaLink>
                    </div>
                  </div>
                </li>
              )}

              <li className="my-3">
                School coordinators can start registering on{" "}
                {new Date(regDate).toLocaleString()} IST.
              </li>

              <li className="my-3">
                The quiz begins on {new Date(startDate).toLocaleString()} IST
                and ends on {new Date(endDate).toLocaleString()} IST. Teams will
                be allowed to login 2 days before the start date.
              </li>

              <li className="my-3">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </li>
              <li className="my-3">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </li>
              <li className="my-3">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </li>
              <li className="my-3">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
