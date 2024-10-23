import { useEffect, useState } from "react";
import useUserStore from "../../stores/userStore";
import usePostStore from "../../stores/postStore";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { FaArrowLeftLong, FaUser } from "react-icons/fa6";
import { toast } from "react-toastify";

const ViewPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [originalPost, setOriginalPost] = useState({}); // State สำหรับเก็บค่าดั้งเดิม
  const [isEditing, setIsEditing] = useState(false);
  const [countLetter, setCountLetter] = useState(0);

  const navigate = useNavigate();

  const publishedDate = moment(`${post.createdAt}`).format("DD/MMM/YY");
  const updatedDate = moment(`${post.updatedAt}`).format("DD/MMM/YY");

  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.token);
  const viewPost = usePostStore((state) => state.viewPost);
  const updatePost = usePostStore((state) => state.updatePost);
  const deletePost = usePostStore((state) => state.deletePost);

  useEffect(() => {
    getPost(postId);
  }, []);

  const getPost = async (postId) => {
    try {
      const res = await viewPost(token, postId);
      setPost(res.data.data);
      setOriginalPost(res.data.data); // ตั้งค่า originalPost ด้วยข้อมูลดั้งเดิม
      setCountLetter(res.data.data.content.length); // ตั้งค่า countLetter ด้วยความยาวของเนื้อหาโพสต์
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    // ใช้ window.confirm เพื่อถามผู้ใช้
    const confirmDelete = window.confirm(
      "คุณแน่ใจหรือไม่ว่าต้องการลบโพสต์นี้?"
    );

    if (!confirmDelete) {
      return; // ถ้าไม่ยืนยันการลบให้หยุดการทำงาน
    }

    try {
      const res = await deletePost(token, post.id);
      toast.success("ลบโพสต์เสร็จเรียบร้อย");
      navigate("/posts");
    } catch (err) {
      console.log(err);
      toast.error("ไม่สามารถลบโพสต์ได้");
    }
  };

  const handleSaveClick = async () => {
    try {
      const res = await updatePost(token, post, post.id);
      toast.success("อัพเดตโพสต์เสร็จเรียบร้อย");
      setIsEditing(false);
      getPost(postId);
    } catch (err) {
      console.log(err);
      toast.error("ไม่สามารถอัพเดตโพสต์ได้");
    }
  };

  const handleCancelClick = () => {
    setPost(originalPost); // รีเซ็ตค่า post กลับไปเป็น originalPost
    setIsEditing(false);
    setCountLetter(originalPost.content.length);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (e.target.name === "content") {
      setCountLetter(e.target.value.length);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
        {/* โหมดการแก้ไข */}
        {isEditing ? (
          <div>
            <input
              type="text"
              name="title"
              value={post.title}
              onChange={handleInputChange}
              placeholder="อัพเดตหัวข้อ"
              className="text-3xl font-bold text-gray-800 mb-4 w-full border-b-2 border-gray-300 focus:outline-none break-words"
            />
            <textarea
              name="content"
              value={post.content}
              onChange={handleInputChange}
              placeholder="อัพเดตเนื้อหา"
              rows="6"
              className="text-base text-gray-700 leading-relaxed w-full border-b-2 border-gray-300 focus:outline-none break-words"
            />
            {/* แสดงจำนวนตัวอักษร */}
            <p className="text-sm text-gray-500">
              จำนวนตัวอักษร: {countLetter} / 10000
            </p>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={handleSaveClick}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-500 transition-all shadow-md hover:shadow-lg"
              >
                บันทึก
              </button>
              <button
                onClick={handleCancelClick}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition-all shadow-md hover:shadow-lg"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col flex-wrap w-full">
            {/* ปุ่มย้อนกลับ */}
            <div
              className="cursor-pointer text-gray-500 mb-4"
              onClick={() => window.history.back() || navigate("/posts")}
            >
              <FaArrowLeftLong size={24} />
            </div>
            {/* หัวข้อโพสต์ */}
            <div className="flex flex-wrap w-full">
              <h1 className="text-3xl font-bold text-gray-800 mb-4 break-words break-all">
                {post.title}
              </h1>
            </div>

            {/* ปุ่ม Edit และ Delete */}
            {user.user?.id === post.userId || user.user.role === "ADMIN" ? (
              <div className="flex space-x-4 mb-4">
                <button
                  onClick={handleEditClick}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition-all shadow-md hover:shadow-lg"
                >
                  แก้ไข
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-500 transition-all shadow-md hover:shadow-lg"
                >
                  ลบโพสต์
                </button>
              </div>
            ) : null}

            {/* ข้อมูลผู้โพสต์ */}
            <h2 className="text-lg text-gray-600 mb-2 font-bold">
              โพสต์โดย: <FaUser /> {post.user?.username || "Unknown User"}
            </h2>

            {/* วันที่โพสต์ */}
            <p className="text-sm text-gray-500 mb-2">
              วันที่โพสต์: {publishedDate}
            </p>

            {/* วันที่อัปเดต */}
            {publishedDate !== updatedDate && (
              <p className="text-sm text-red-500 mb-4">
                อัพเดตเมื่อ: {updatedDate}
              </p>
            )}

            {/* เนื้อหาโพสต์ */}
            <p className="text-base text-gray-700 leading-relaxed break-words overflow-auto break-all">
              {post.content}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewPost;
