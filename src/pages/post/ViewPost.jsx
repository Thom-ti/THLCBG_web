import { useEffect, useState } from "react";
import useUserStore from "../../stores/userStore";
import usePostStore from "../../stores/postStore";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { FaArrowLeftLong } from "react-icons/fa6";
import { toast } from "react-toastify";

const ViewPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [isEditing, setIsEditing] = useState(false);

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
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await deletePost(token, post.id);
      toast.success("Delete post successfully");
      navigate("/posts");
    } catch (err) {
      console.log(err);
      toast.error("Cannot delete post");
    }
  };

  // console.log("Post", post);
  // console.log("User", user.user);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
        {/* ปุ่มย้อนกลับ */}
        <div
          className="cursor-pointer text-gray-500 mb-4"
          onClick={() => window.history.back()}
        >
          <FaArrowLeftLong size={24} />
        </div>

        {/* หัวข้อโพสต์ */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>

        {/* ปุ่ม Edit และ Delete */}
        {user.user?.id === post.userId || user.user.role === "ADMIN" ? (
          <div className="flex space-x-4 mb-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition-all shadow-md hover:shadow-lg">
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-500 transition-all shadow-md hover:shadow-lg"
            >
              Delete
            </button>
          </div>
        ) : null}

        {/* ข้อมูลผู้โพสต์ */}
        <h2 className="text-lg text-gray-600 mb-2">
          โพสต์โดย: {post.user?.username || "Unknown User"}
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
        <p className="text-base text-gray-700 leading-relaxed">
          {post.content}
        </p>
      </div>
    </div>
  );
};

export default ViewPost;
