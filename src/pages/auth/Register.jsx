import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useUserStore from "../../stores/userStore";
import validateRegister from "../../utils/validator";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [initialState, setInitialState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const register = useUserStore((state) => state.register);

  const hdlOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const hdlRegister = async (e) => {
    try {
      e.preventDefault();
      if (
        !(
          form.username.trim() &&
          form.email.trim() &&
          form.password.trim() &&
          form.confirmPassword.trim()
        )
      ) {
        return alert("Please fill all inputs");
      }
      if (form.password !== form.confirmPassword) {
        return alert("Passwords do not match");
      }

      const error = validateRegister(form);
      if (error) {
        return setFormErrors(error);
      }

      const data = await register(form);

      setForm(initialState);
      toast.success("Register successfully");
    } catch (err) {
      const errMsg = err.response?.data?.error || err.message;
      console.log(errMsg);
      toast.error(errMsg);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-3xl font-bold text-center mb-2">TH - LC - BG</h1>
      <h2 className="text-center text-lg mb-6">Registration</h2>
      <form onSubmit={hdlRegister}>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            name="username"
            type="text"
            value={form.username}
            onChange={hdlOnChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Your Username"
          />
          {formErrors.username && (
            <p className="text-red-500 text-xs font-bold">
              {formErrors.username}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={hdlOnChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Your Email"
          />
          {formErrors.email && (
            <p className="text-red-500 text-xs font-bold">{formErrors.email}</p>
          )}
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-700">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={hdlOnChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Your Password"
          />
          {formErrors.password && (
            <p className="text-red-500 text-xs font-bold">
              {formErrors.password}
            </p>
          )}
          <i className="fas fa-eye absolute right-3 top-3 text-gray-500"></i>
        </div>
        <div className="mb-6 relative">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={hdlOnChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Confirm Password"
          />
          {formErrors.confirmPassword && (
            <p className="text-red-500 text-xs font-bold">
              {formErrors.confirmPassword}
            </p>
          )}
          <i className="fas fa-eye absolute right-3 top-3 text-gray-500"></i>
        </div>
        <button className="w-full bg-[#FFB22C] text-white py-2 rounded">
          Register
        </button>
      </form>
      <p className="text-center mt-4">
        Already a User?{" "}
        <li className="text-blue-500 list-none hover:cursor-pointer active:scale-105">
          <Link to="/login">Login now</Link>
        </li>
      </p>
    </div>
  );
};

export default Register;
