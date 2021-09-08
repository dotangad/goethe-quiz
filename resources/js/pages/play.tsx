import React from "react";
import Layout from "../components/Layout";

const Play: React.FC = () => {
  return (
    <Layout links={[{ href: "/leaderboard", label: "Leaderboard" }]}>
      <div className="flex w-full h-full items-center justify-center">
        <div className="bg-white border-none border-gray-200 rounded-lg w-full max-w-sm p-6 mx-2 shadow-sm">
          hello
        </div>
      </div>
    </Layout>
  );
};

export default Play;
