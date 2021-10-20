import { useForm } from "@inertiajs/inertia-react";
import React from "react";
import Layout from "../../components/Layout";

const SchoolLogin: React.FC = () => {
  const { setData, post, processing, errors, data } = useForm({
    name: "",
    principal: "",
    principal_mobile: "",
    teacher_incharge: "",
    teacher_incharge_email: "",
    teacher_incharge_mobile: "",
    postal_code: "",
    address: "",
    email: "",
    password: "",
    "confirm-password": "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setData(e.target.name as never, e.target.value as never);

  return (
    <Layout
      links={[
        { href: "/", label: "Rules" },
        { href: "/auth/school/login", label: "Login" },
      ]}
    >
      <div className="flex w-full h-full items-center justify-center">
        <div className="bg-white border-none border-gray-200 rounded-lg w-full max-w-3xl min-w-sm p-6 mx-2 shadow-sm">
          <div className="text-2xl font-bold mb-5">Register as School</div>

          <form
            className="flex flex-wrap"
            onSubmit={(e: React.SyntheticEvent) => {
              e.preventDefault();
              post("/auth/school/register", {
                preserveState: true,
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
              />
              {errors.address && <div className="error">{errors.address}</div>}
            </div>

            <div className="input-group my-3 w-full sm:w-1/2 sm:px-2">
              <label htmlFor="email">Email (Login)</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="teacherincharge@example.com"
                disabled={processing}
                onChange={handleChange}
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>

            <div className="input-group my-3 w-full sm:w-1/2 sm:px-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="5eb2658fb820"
                disabled={processing}
                onChange={handleChange}
              />
              {errors.password && (
                <div className="error">{errors.password}</div>
              )}
            </div>

            <div className="input-group my-3 w-full sm:w-1/2 sm:px-2">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="5eb2658fb820"
                disabled={processing}
                onChange={handleChange}
              />
              {errors["confirm-password"] && (
                <div className="error">{errors["confirm-password"]}</div>
              )}
            </div>

            <div className="input-group mt-3 w-full sm:w-1/2 sm:px-2">
              <label style={{ color: "white" }}>.</label>
              <button type="submit" className="button w-full">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SchoolLogin;
