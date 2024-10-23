import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../../stores/userStore";
import { toast } from "react-toastify";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const login = useUserStore((state) => state.login);

  const hdlOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const hdlLogin = async (e) => {
    try {
      e.preventDefault();
      if (!(form.email.trim() && form.password.trim())) {
        return toast.info("Please fill all inputs");
      }
      const data = await login(form);
      navigate("/");
    } catch (err) {
      const errMsg = err.response?.data?.error || err.message;
      console.log(errMsg);
      toast.error(errMsg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="flex items-center mb-6">
          <i className="fas fa-arrow-left text-xl"></i>
        </div>
        <h1 className="text-3xl font-bold text-center mb-2">TH - LC - BG</h1>
        <p className="text-center mb-6">โปรดเข้าสู่ระบบก่อนใช้งาน</p>
        <form onSubmit={hdlLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">อีเมล</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={hdlOnChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="กรอกอีเมลของคุณ"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">รหัสผ่าน</label>
            <div className="relative">
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={hdlOnChange}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="กรอกรหัสผ่านของคุณ"
              />
              <i className="fas fa-eye absolute right-3 top-3 text-gray-500"></i>
            </div>
          </div>
          <button className="w-full bg-[#FFB22C] text-white py-2 rounded-lg active:bg-[#B74406]">
            เข้าสู่ระบบ
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            มีบัญชีหรือยัง?{" "}
            <li className="text-blue-500 list-none hover:cursor-pointer active:scale-105">
              <Link to="/register">สมัครสมาชิกที่นี่</Link>
            </li>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
