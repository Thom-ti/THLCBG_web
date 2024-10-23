import moment from "moment";
import { FaUser, FaShieldAlt } from "react-icons/fa"; // เพิ่มไอคอนสำหรับ ADMIN
import { Link } from "react-router-dom";

const PostItem = (props) => {
  const { post } = props;
  const publishedDate = moment(`${post.createdAt}`).format("DD/MMM/YY");
  const updatedDate = moment(`${post.updatedAt}`).format("DD/MMM/YY");

  return (
    <div
      className={`flex flex-col bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ${
        post.type === "ADMIN" ? "border border-yellow-500 bg-yellow-50" : ""
      }`}
    >
      <Link to={`/posts/${post.id}`}>
        <h2 className="text-blue-700 text-lg font-semibold hover:underline mb-2">
          {post.title}
        </h2>
      </Link>

      <div className="flex items-center text-sm text-gray-600 mb-1">
        <FaUser className="mr-1" />
        {post.user.username}
        {post.type === "ADMIN" && (
          <span className="text-yellow-600 ml-2 flex items-center">
            <FaShieldAlt className="mr-1" />
            ADMIN
          </span>
        )}
      </div>

      {/* วันที่โพสต์ */}
      <p className="text-sm text-gray-500 mb-1">
        วันที่โพสต์: <span className="font-medium">{publishedDate}</span>
      </p>

      {/* วันที่อัปเดต */}
      {publishedDate !== updatedDate && (
        <p className="text-sm text-red-500 mb-2">
          อัพเดตเมื่อ: <span className="font-medium">{updatedDate}</span>
        </p>
      )}
    </div>
  );
};

export default PostItem;
