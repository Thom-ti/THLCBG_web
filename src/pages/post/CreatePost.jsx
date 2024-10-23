import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../stores/userStore";
import usePostStore from "../../stores/postStore";

const CreatePost = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.token);
  const createPost = usePostStore((state) => state.createPost);

  const [form, setForm] = useState({
    title: "",
    type: "",
    content: "",
  });

  const [initialForm, setInitialForm] = useState({
    title: "",
    type: "",
    content: "",
  });

  const [countLetter, setCountLetter] = useState(0);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createPost(token, form);
      toast.success("สร้างโพสต์สําเร็จ");
      setForm(initialForm);
      navigate("/posts");
    } catch (err) {
      console.log(err);
      toast.error("ไม่สามารถสร้างโพสต์ได้");
    }
  };

  const handleOnChange = async (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "content") {
      setCountLetter(e.target.value.length);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        {/* ส่วนหัวของฟอร์ม */}
        <div className="flex items-center mb-6">
          <div
            className="cursor-pointer text-gray-500 mr-4"
            onClick={() => window.history.back() || navigate("/posts")}
          >
            <FaArrowLeftLong size={24} />
          </div>
          <h1 className="font-bold text-3xl text-gray-800">สร้างโพสต์ใหม่</h1>
        </div>

        {/* ฟอร์มสำหรับกรอกข้อมูล */}
        <form onSubmit={handleOnSubmit} className="space-y-6">
          {/* หัวข้อโพสต์ */}
          <div>
            <label
              htmlFor="title"
              className="block text-lg font-medium text-gray-700"
            >
              หัวข้อ:
            </label>
            <input
              name="title"
              type="text"
              placeholder="หัวข้อโพสต์"
              className="input input-bordered w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              onChange={handleOnChange}
            />
          </div>

          {/* หมวดหมู่โพสต์ */}
          <div>
            <label
              htmlFor="type"
              className="block text-lg font-medium text-gray-700"
            >
              หมวดหมู่:
            </label>
            <select
              name="type"
              className="select select-bordered w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              onChange={handleOnChange}
            >
              <option disabled selected>
                เลือกหมวดหมู่
              </option>
              {user.user.role === "ADMIN" && (
                <option value="ADMIN" className="text-red-500">โพสต์โดย Admin</option>
              )}
              <option value="GENERAL">ทั่วไป</option>
              <option value="HOWTOPLAY">วิธีเล่น</option>
              <option value="REVIEW">รีวิว</option>
            </select>
          </div>

          {/* เนื้อหาโพสต์ */}
          <div>
            <div className="flex justify-between">
              <label
                htmlFor="content"
                className="block text-lg font-medium text-gray-700"
              >
                เนื้อหา:
              </label>
              <p className="text-sm text-gray-500 mb-1">
                จํานวนตัวอักษร: {countLetter} / 10000
              </p>
            </div>
            <textarea
              name="content"
              cols="30"
              rows="6"
              placeholder="เนื้อหาโพสต์"
              className="textarea textarea-bordered w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              onChange={handleOnChange}
            ></textarea>
          </div>

          {/* ปุ่มสร้างโพสต์ */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-primary px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
            >
              สร้างโพสต์
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
