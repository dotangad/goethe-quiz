import React from "react";
import _ from "underscore";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import Layout from "../components/Layout";
import { IPageProps } from "../lib/types";

const Dashboard = () => {
  const {props: {user, schoolInfo}} = usePage<IPageProps>();
  const show = {
    Email: user.email,
    Address: schoolInfo?.address,
    Country: schoolInfo?.country,
    Phone: schoolInfo?.phone,
    Principal: schoolInfo?.principal,
    "Teacher Incharge": schoolInfo?.teacher_incharge,
  };

  return <Layout links={[{href: "", label: "Rules"}]}>
    <div className="flex w-full h-full items-center justify-start flex-col px-2 sm:px-20">
      <div className="bg-white border-none border-gray-200 rounded-lg w-full p-6 shadow-sm max-w-screen-md">
        <h1 className="text-3xl font-bold mb-5">{schoolInfo?.name}</h1> 

        <div className="flex flex-wrap items-center">
          {Object.entries(show).map(([label, value], i) => (
            <div className="input-group my-3 px-3 w-full sm:w-1/2" key={i}>
              <label>{label}</label>
              <div className="w-full">{value}</div>
            </div>
          ))}
        </div>

        <div className="w-full flex justify-end items-center mt-5">
          <InertiaLink href="" className="button mr-3">Edit</InertiaLink>
          <InertiaLink href="" className="button">Forgot Password</InertiaLink>
        </div>
      </div>
    </div>
  </Layout>;
};

export default Dashboard;