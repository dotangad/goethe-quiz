import React from "react";
import { InertiaLink, usePage, useForm } from "@inertiajs/inertia-react";
import { compareAsc } from "date-fns";
import { IPageProps } from "../lib/types";

const DashboardSchoolCard: React.FC = () => {
  const [editing, setEditing] = React.useState<boolean>(false);
  const {
    props: { user, schoolInfo, endDate },
  } = usePage<IPageProps>();
  const ended = compareAsc(new Date(), new Date(endDate)) === 1;
  const { setData, post, processing, errors, data } = useForm({
    name: schoolInfo?.name,
    principal: schoolInfo?.principal,
    country: schoolInfo?.country,
    phone: schoolInfo?.phone,
    teacher_incharge: schoolInfo?.teacher_incharge,
    address: schoolInfo?.address,
  });
  const show = {
    Email: user.email,
    Address: schoolInfo?.address,
    Country: schoolInfo?.country,
    Phone: schoolInfo?.phone,
    Principal: schoolInfo?.principal,
    "Teacher Incharge": schoolInfo?.teacher_incharge,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setData(e.target.name as never, e.target.value as never);

  return (
    <div className="bg-white border-none rounded-lg w-full p-6 shadow-sm max-w-screen-md">
      <h1 className="text-3xl font-bold mb-5">{schoolInfo?.name}</h1>

      {editing ? (
        <>
          <form
            className="flex flex-wrap"
            onSubmit={(e: React.SyntheticEvent) => {
              e.preventDefault();
              post("/dashboard/school/edit", {
                preserveState: false,
              });
            }}
          >
            <div className="input-group my-3 w-full sm:w-1/2 sm:px-2">
              <label htmlFor="name">School name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="XYZ Public School"
                disabled={processing}
                onChange={handleChange}
                value={data.name}
              />
              {errors.name && <div className="error">{errors.name}</div>}
            </div>

            <div className="input-group my-3 w-full sm:w-1/2 sm:px-2">
              <label htmlFor="principal">School principal</label>
              <input
                type="text"
                name="principal"
                id="principal"
                placeholder="John Doe"
                disabled={processing}
                onChange={handleChange}
                value={data.principal}
              />
              {errors.principal && (
                <div className="error">{errors.principal}</div>
              )}
            </div>

            <div className="input-group my-3 w-full sm:w-1/2 sm:px-2">
              <label htmlFor="country">Country</label>
              <select
                name="country"
                disabled={processing}
                onChange={(e) => setData("country", e.target.value)}
                defaultValue={data.country}
                className="block w-full p-3 border-2 border-gray-bg bg-white rounded-lg focus:outline-none focus:border-goethe transition"
              >
                <option disabled value="">
                  Select a country
                </option>
                <option value="India">India</option>
                <option value="Nepal">Nepal</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Pakistan">Pakistan</option>
              </select>
              {errors.country && <div className="error">{errors.country}</div>}
            </div>

            <div className="input-group my-3 w-full sm:w-1/2 sm:px-2">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="+91 123456789"
                disabled={processing}
                onChange={handleChange}
                value={data.phone}
              />
              {errors.phone && <div className="error">{errors.phone}</div>}
            </div>

            <div className="input-group my-3 w-full sm:w-1/2 sm:px-2">
              <label htmlFor="teacher_incharge">Teacher Incharge</label>
              <input
                type="text"
                name="teacher_incharge"
                id="teacher_incharge"
                placeholder="John Doe"
                disabled={processing}
                onChange={handleChange}
                value={data.teacher_incharge}
              />
              {errors["teacher_incharge"] && (
                <div className="error">{errors["teacher_incharge"]}</div>
              )}
            </div>

            <div className="input-group my-3 w-full sm:w-1/2 sm:px-2">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="123, ABC Street"
                disabled={processing}
                onChange={handleChange}
                value={data.address}
              />
              {errors.address && <div className="error">{errors.address}</div>}
            </div>

            <div className="input-group mt-3 w-full flex justify-center">
              <label style={{ color: "white" }}>.</label>
              <button type="submit" className="button w-full sm:w-1/2">
                Save
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="flex flex-wrap items-start">
          {Object.entries(show).map(([label, value], i) => (
            <div className="input-group my-3 px-3 w-full sm:w-1/2" key={i}>
              <label>{label}</label>
              <div className="w-full">{value}</div>
            </div>
          ))}
        </div>
      )}

      <div className="w-full flex justify-end items-center mt-5">
        {!ended &&
          (editing ? (
            <>
              <a onClick={() => setEditing(false)} className="button mr-3">
                Reset
              </a>
            </>
          ) : (
            <a onClick={() => setEditing(true)} className="button mr-3">
              Edit
            </a>
          ))}
        <InertiaLink href="" className="button">
          Change Password
        </InertiaLink>
      </div>
    </div>
  );
};

export default DashboardSchoolCard;
