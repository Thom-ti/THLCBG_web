import moment from "moment";
import { FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

const PostItem = (props) => {
  const { post } = props;
  const publishedDate = moment(`${post.createdAt}`).format("DD/MMM/YY");
  const updatedDate = moment(`${post.updatedAt}`).format("DD/MMM/YY");
  // console.log("PostItem", post);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <Link to={`/posts/${post.id}`}>
        <h2 className="text-blue-700 text-lg font-semibold hover:underline">
          {post.title}
        </h2>
      </Link>
      <div className="text-sm text-gray-600">
        <FaUser />
        {post.user.username}
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
