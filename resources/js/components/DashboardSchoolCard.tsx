import React from "react";
import { usePage, useForm } from "@inertiajs/inertia-react";
import { compareAsc } from "date-fns";
import { IPageProps } from "../lib/types";

const DashboardSchoolCard: React.FC = () => {
  const [editing, setEditing] = React.useState<boolean>(false);
  const {
    props: { user, regEndDate },
  } = usePage<IPageProps>();
  const regClosed = compareAsc(new Date(), new Date(regEndDate)) === 1;
  const { setData, post, processing, errors, data } = useForm({
    name: user.name,
    principal: user.principal,
    principal_mobile: user.principal_mobile,
    teacher_incharge: user.teacher_incharge,
    teacher_incharge_email: user.teacher_incharge_email,
    teacher_incharge_mobile: user.teacher_incharge_mobile,
    postal_code: user.postal_code,
    address: user.address,
  });

  const show = {
    Email: user.email,
    Principal: user.principal,
    "Principal Mobile": user.principal_mobile,
    "Teacher Incharge": user.teacher_incharge,
    "Teacher Incharge Email": user.teacher_incharge_email,
    "Teacher Incharge Mobile": user.teacher_incharge_mobile,
    "Postal Code": user.postal_code,
    Address: user.address,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setData(e.target.name as never, e.target.value as never);

  return (
    <div className="bg-white border-none rounded-lg w-full p-6 shadow-sm max-w-screen-md">
      <h1 className="text-3xl font-bold mb-5">{user.name}</h1>

      {editing ? (
        <>
          <form
            className="flex flex-wrap"
            onSubmit={(e: React.SyntheticEvent) => {
              e.preventDefault();
              post("/dashboard/edit", {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => setEditing(false),
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
              <label htmlFor="principal_mobile">Principal Mobile</label>
              <input
                type="text"
                name="principal_mobile"
                id="principal_mobile"
                placeholder="123456789"
                disabled={processing}
                onChange={handleChange}
                value={data.principal_mobile}
              />
              {errors.principal_mobile && (
                <div className="error">{errors.principal_mobile}</div>
              )}
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
              <label htmlFor="teacher_incharge_mobile">
                Teacher Incharge Mobile
              </label>
              <input
                type="text"
                name="teacher_incharge_mobile"
                id="teacher_incharge_mobile"
                placeholder="123456789"
                disabled={processing}
                onChange={handleChange}
                value={data.teacher_incharge_mobile}
              />
              {errors.teacher_incharge_mobile && (
                <div className="error">{errors.teacher_incharge_mobile}</div>
              )}
            </div>

            <div className="input-group my-3 w-full sm:w-1/2 sm:px-2">
              <label htmlFor="teacher_incharge_email">
                Teacher Incharge Email
              </label>
              <input
                type="email"
                name="teacher_incharge_email"
                id="teacher_incharge_email"
                placeholder="teacherincharge@example.com"
                disabled={processing}
                onChange={handleChange}
                value={data.teacher_incharge_email}
              />
              {errors.teacher_incharge_email && (
                <div className="error">{errors.teacher_incharge_email}</div>
              )}
            </div>

            <div className="input-group my-3 w-full sm:w-1/2 sm:px-2">
              <label htmlFor="postal_code">Postal Code</label>
              <input
                type="text"
                name="postal_code"
                id="postal_code"
                placeholder="110022"
                disabled={processing}
                onChange={handleChange}
                value={data.postal_code}
              />
              {errors.postal_code && (
                <div className="error">{errors.postal_code}</div>
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
            <div
              className="input-group my-3 sm:odd:pr-3 sm:even:pl-3 w-full sm:w-1/2"
              key={i}
            >
              <label>{label}</label>
              <div className="w-full">{value}</div>
            </div>
          ))}
        </div>
      )}

      <div className="w-full flex justify-end items-center mt-5">
        {!regClosed &&
          (editing ? (
            <>
              <a onClick={() => setEditing(false)} className="button">
                Reset
              </a>
            </>
          ) : (
            <a onClick={() => setEditing(true)} className="button">
              Edit
            </a>
          ))}
      </div>
    </div>
  );
};

export default DashboardSchoolCard;
