import React from "react";
import AdminSchoolCard from "../../components/AdminSchoolCard";
import Layout from "../../components/Layout";
import Table from "../../components/Table";
import { IUser } from "../../lib/types";

interface ISchoolProps {
  school: IUser;
}

const School: React.FC<ISchoolProps> = ({ school }: ISchoolProps) => {
  return (
    <Layout links={[{ href: "/admin", label: "Home" }]}>
      <div className="w-full sm:max-w-screen-md mx-auto">
        <AdminSchoolCard school={school} />
        <div className="w-full py-6 max-w-screen-md flex flex-wrap">
          <Table
            records={
              school.teams
                ? school.teams.map(
                    ({ id, email, student_name, student_mobile }) => ({
                      id: String(id),
                      name: student_name || "",
                      email: email || "",
                      mobile: student_mobile || "",
                      toBtn: `/admin/teams/${id}`,
                    })
                  )
                : []
            }
          />
        </div>
      </div>
    </Layout>
  );
};

export default School;
