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
        toast.info("โปรดกรอกข้อมูลให้ครบถ้วน");
      }
      if (form.password !== form.confirmPassword) {
        toast.error("รหัสผ่านไม่ตรงกัน");
      }

      const error = validateRegister(form);
      if (error) {
        return setFormErrors(error);
      }

      const data = await register(form);

      setForm(initialState);
      toast.success("สมัครสมาชิกสําเร็จ");
    } catch (err) {
      const errMsg = err.response?.data?.error || err.message;
      console.log(errMsg);
      toast.error("ไม่สามารถสมัครสมาชิกได้");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2">TH - LC - BG</h1>
        <h2 className="text-center text-lg mb-6">สร้างบัญชีผู้ใช้</h2>
        <form onSubmit={hdlRegister}>
          <div className="mb-4">
            <label className="block text-gray-700">ชื่อผู้ใช้งาน</label>
            <input
              name="username"
              type="text"
              value={form.username}
              onChange={hdlOnChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="กรอกชื่อผู้ใช้งาน"
            />
            {formErrors.username && (
              <p className="text-red-500 text-xs font-bold">
                {formErrors.username}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">อีเมล</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={hdlOnChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="กรอกอีเมล"
            />
            {formErrors.email && (
              <p className="text-red-500 text-xs font-bold">
                {formErrors.email}
              </p>
            )}
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700">รหัสผ่าน</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={hdlOnChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="กรอกรหัสผ่าน"
            />
            {formErrors.password && (
              <p className="text-red-500 text-xs font-bold">
                {formErrors.password}
              </p>
            )}
            <i className="fas fa-eye absolute right-3 top-3 text-gray-500"></i>
          </div>
          <div className="mb-6 relative">
            <label className="block text-gray-700">ยืนยันรหัสผ่าน</label>
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={hdlOnChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="กรอกการยืนยันรหัสผ่าน"
            />
            {formErrors.confirmPassword && (
              <p className="text-red-500 text-xs font-bold">
                {formErrors.confirmPassword}
              </p>
            )}
            <i className="fas fa-eye absolute right-3 top-3 text-gray-500"></i>
          </div>
          <button className="w-full bg-[#FFB22C] text-white py-2 rounded">
            สมัคร
          </button>
        </form>
        <p className="text-center mt-4">
          มีบัญชีแล้ว?{" "}
          <li className="text-blue-500 list-none hover:cursor-pointer active:scale-105">
            <Link to="/login">เข้าสู่ระบบ</Link>
          </li>
        </p>
      </div>
    </div>
  );
};

export default Register;
