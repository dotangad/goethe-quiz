import React from "react";
import Layout from "../components/Layout";

interface IErrorProps {
  status: number;
  message?: string;
}

const Error: React.FC<IErrorProps> = ({ status, message }: IErrorProps) => {
  return (
    <Layout
      links={[
        { href: "/", label: "Home" },
        { href: "", label: "Rules" },
      ]}
    >
      <div className="flex w-full h-full items-center justify-center">
        <div className="bg-white border-none border-gray-200 rounded-lg w-full max-w-sm p-6 mx-2">
          <h1 className="text-4xl font-bold mb-2">{status}</h1>
          {message ? <p>{message}</p> : <p>An error occured.</p>}
        </div>
      </div>
    </Layout>
  );
};

export default Error;
