import { useForm } from "@inertiajs/inertia-react";
import React from "react";
import Layout from "../../components/Layout";

const SchoolLogin: React.FC = () => {
  const { setData, post, processing, errors, data } = useForm({
    name: "",
    principal: "",
    country: "",
    phone: "",
    teacher_incharge: "",
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
        { href: "/", label: "Home" },
        { href: "", label: "Rules" },
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
              />
              {errors.address && <div className="error">{errors.address}</div>}
            </div>

            <div className="input-group my-3 w-full sm:w-1/2 sm:px-2">
              <label htmlFor="email">Email</label>
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
