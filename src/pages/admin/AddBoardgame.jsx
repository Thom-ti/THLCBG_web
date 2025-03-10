import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../stores/userStore";
import useAdminStore from "../../stores/adminStore";

const AddBoardgame = () => {
  const navigate = useNavigate();
  const token = useUserStore((state) => state.token);
  const addBoardGame = useAdminStore((state) => state.addBoardGame);

  const [form, setForm] = useState({
    name: "",
    thaiName: "",
    minPlayer: "",
    maxPlayer: "",
    age: "",
    type: "",
    category: "",
    thaiLC: "",
    description: "",
  });

  const [initialForm, setInitialForm] = useState({
    name: "",
    thaiName: "",
    minPlayer: "",
    maxPlayer: "",
    age: "",
    type: "",
    category: "",
    thaiLC: "",
    description: "",
  });

  const [boardgameImage, setBoardgameImage] = useState(null);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    if (boardgameImage) {
      formData.append("boardgameImage", boardgameImage);
    }

    try {
      const res = await addBoardGame(token, formData);
      setForm(initialForm);
      setBoardgameImage(null);
      toast.success("เพิ่มบอร์ดเกมสําเร็จ");
    } catch (err) {
      console.log(err);
      toast.error("ไม่สามารถเพิ่มบอร์ดเกมได้");
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setBoardgameImage(e.target.files[0]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
        {/* ส่วนหัวของฟอร์ม */}
        <div className="flex items-center mb-6">
          <div
            className="cursor-pointer text-gray-500 mr-4"
            onClick={() =>
              window.history.back() || navigate("/admin/delete-boardgame")
            }
          >
            <FaArrowLeftLong size={24} />
          </div>
          <h1 className="font-bold text-3xl text-gray-800">
            เพิ่มบอร์ดเกมใหม่
          </h1>
        </div>

        {/* ฟอร์มสำหรับกรอกข้อมูล */}
        <form onSubmit={handleOnSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ชื่อบอร์ดเกม */}
            <div>
              <label
                htmlFor="name"
                className="block text-lg font-medium text-gray-700"
              >
                ชื่อ:
              </label>
              <input
                name="name"
                value={form.name}
                type="text"
                placeholder="ชื่อบอร์ดเกม"
                className="input input-bordered w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                onChange={handleOnChange}
              />
            </div>

            {/* ชื่อภาษาไทย */}
            <div>
              <label
                htmlFor="thaiName"
                className="block text-lg font-medium text-gray-700"
              >
                ชื่อภาษาไทย:
              </label>
              <input
                name="thaiName"
                value={form.thaiName}
                type="text"
                placeholder="ชื่อบอร์ดเกมภาษาไทย"
                className="input input-bordered w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                onChange={handleOnChange}
              />
            </div>

            {/* รูปภาพบอร์ดเกม */}
            <div className="md:col-span-2">
              <label
                htmlFor="boardgameImage"
                className="block text-lg font-medium text-gray-700"
              >
                รูปภาพบอร์ดเกม:
              </label>
              <input
                name="boardgameImage"
                type="file"
                accept="image/*"
                className="input input-bordered w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={handleFileChange}
                required
              />
            </div>

            {/* ผู้เล่นขั้นต่ำ */}
            <div>
              <label
                htmlFor="minPlayer"
                className="block text-lg font-medium text-gray-700"
              >
                ผู้เล่นขั้นต่ำ:
              </label>
              <input
                name="minPlayer"
                value={form.minPlayer}
                type="number"
                placeholder="จำนวนผู้เล่นขั้นต่ำ"
                className="input input-bordered w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                onChange={handleOnChange}
              />
            </div>

            {/* ผู้เล่นสูงสุด */}
            <div>
              <label
                htmlFor="maxPlayer"
                className="block text-lg font-medium text-gray-700"
              >
                ผู้เล่นสูงสุด:
              </label>
              <input
                name="maxPlayer"
                value={form.maxPlayer}
                type="number"
                placeholder="จำนวนผู้เล่นสูงสุด"
                className="input input-bordered w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                onChange={handleOnChange}
              />
            </div>

            {/* อายุที่แนะนำ */}
            <div>
              <label
                htmlFor="age"
                className="block text-lg font-medium text-gray-700"
              >
                อายุที่แนะนำ:
              </label>
              <input
                name="age"
                value={form.age}
                type="number"
                placeholder="อายุที่แนะนำ (ปี)"
                className="input input-bordered w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                onChange={handleOnChange}
              />
            </div>

            {/* ประเภท */}
            <div>
              <label
                htmlFor="type"
                className="block text-lg font-medium text-gray-700"
              >
                ประเภท:
              </label>
              <select
                name="type"
                value={form.type}
                className="select select-bordered w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                onChange={handleOnChange}
              >
                <option value="" disabled>
                  เลือกประเภท
                </option>
                <option value="CORE">ตัวหลัก (Core)</option>
                <option value="EXPANSION">ตัวเสริม (Expansion)</option>
              </select>
            </div>

            {/* หมวดหมู่ */}
            <div>
              <label
                htmlFor="category"
                className="block text-lg font-medium text-gray-700"
              >
                หมวดหมู่:
              </label>
              <select
                name="category"
                value={form.category}
                className="select select-bordered w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                onChange={handleOnChange}
              >
                <option value="" disabled>
                  เลือกหมวดหมู่
                </option>
                <option value="STRATEGY">กลยุทธ์ (Strategy)</option>
                <option value="PARTY">ปาร์ตี้ (Party)</option>
                <option value="FAMILY">เกมสำหรับครอบครัว (Family)</option>
                <option value="PUZZLE">ไขปริศนา (Puzzle)</option>
                <option value="DEDUCTION">ตัดช้อยส์ (Deduction)</option>
                <option value="THEMATIC">เกมเนื้อเรื่อง (Thematic)</option>
                <option value="RACING">วิ่งแข่ง (Racing)</option>
                <option value="BLUFFING">เกมโกหก (Bluffing)</option>
                <option value="OTHERS">อื่น ๆ (Others)</option>
              </select>
            </div>

            {/* ThaiLC */}
            <div>
              <label
                htmlFor="thaiLC"
                className="block text-lg font-medium text-gray-700"
              >
                ThaiLC:
              </label>
              <input
                name="thaiLC"
                value={form.thaiLC}
                type="text"
                placeholder="ThaiLC"
                className="input input-bordered w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                onChange={handleOnChange}
              />
            </div>

            {/* คำอธิบาย */}
            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="block text-lg font-medium text-gray-700"
              >
                คำอธิบาย:
              </label>
              <textarea
                name="description"
                value={form.description}
                cols="30"
                rows="6"
                placeholder="คำอธิบายเกี่ยวกับบอร์ดเกม"
                className="textarea textarea-bordered w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                onChange={handleOnChange}
              ></textarea>
            </div>
          </div>

          {/* ปุ่มสร้างบอร์ดเกม */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-primary px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
            >
              เพิ่มบอร์ดเกม
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBoardgame;
