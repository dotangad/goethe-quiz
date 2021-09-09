import { InertiaLink } from "@inertiajs/inertia-react";
import React from "react";
import Layout from "../../components/Layout";

interface IAdminProps {
  stats: { string: number };
}

const Admin: React.FC<IAdminProps> = ({ stats }: IAdminProps) => {
  const links = [
    {
      href: "/admin/questions",
      title: "Questions",
      description: "Create, read, update, delete questions",
    },
    {
      href: "/admin/schools",
      title: "Schools",
      description: "List schools and teams, change passwords, login as schools",
    },
    {
      href: "/admin/teams",
      title: "Teams",
      description: "List teams, change passwords",
    },
  ];

  return (
    <Layout links={[{ href: "", label: "Leaderboard" }]}>
      <div className="w-full sm:max-w-screen-sm mx-auto h-full">
        <div className="w-full p-6 bg-white rounded-lg shadow-sm">
          <h1 className="font-bold text-2xl text-center">
            DPS Goethe Quiz Control Center
          </h1>
        </div>

        <div className="flex flex-wrap">
          {Object.entries(stats).map(([label, n], i) => (
            <div className="w-full sm:w-1/2 odd:pr-3 even:pl-3 my-4" key={i}>
              <div className="w-full bg-white rounded-lg shadow-sm p-6">
                <div className="text-center text-4xl font-bold">
                  {String(n)}
                </div>
                <div className="text-center font-bold uppercase text-gray-500 text-sm">
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {links.map(({ href, title, description }, i) => (
          <InertiaLink
            className="block w-full p-6 bg-white rounded-lg shadow-sm flex my-3"
            href={href}
            key={i}
          >
            <div className="flex-1 flex h-full flex-col justify-center">
              <h3 className="font-bold text-lg">{title}</h3>
              <div className="text-gray-600">{description}</div>
            </div>
            <div className="flex justify-center items-center">
              <div className="flex justify-center items-center bg-gray-bg p-3 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </InertiaLink>
        ))}
      </div>
    </Layout>
  );
};

export default Admin;
