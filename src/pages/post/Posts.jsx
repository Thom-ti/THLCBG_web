import { useEffect } from "react";
import useUserStore from "../../stores/userStore";
import usePostStore from "../../stores/postStore";
import PostItem from "./PostItem";
import { Link } from "react-router-dom";

const Posts = () => {
  const token = useUserStore((state) => state.token);
  const posts = usePostStore((state) => state.posts);
  const getAllPosts = usePostStore((state) => state.getAllPosts);

  useEffect(() => {
    getAllPosts(token);
  }, [getAllPosts, token]);

  // แยกโพสต์ที่เป็น ADMIN และโพสต์ทั่วไป
  const adminPosts = Array.isArray(posts)
    ? posts.filter((post) => post.type === "ADMIN")
    : [];
  const regularPosts = Array.isArray(posts)
    ? posts.filter((post) => post.type !== "ADMIN")
    : [];
  // const adminPosts = posts?.filter(post => post.type === "ADMIN");
  // const regularPosts = posts?.filter(post => post.type !== "ADMIN");

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        {/* ปุ่มโพสต์ใหม่ */}
        <div className="flex justify-end mb-6">
          <Link to="/posts/create-post">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition-all">
              + โพสต์ใหม่
            </button>
          </Link>
        </div>

        {/* รายการโพสต์ */}
        <div className="space-y-6">
          {adminPosts.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold">โพสต์จากผู้ดูแล</h2>
              {adminPosts?.map((post) => (
                <div key={post.id} className="mb-4">
                  <PostItem post={post} />
                </div>
              ))}
            </div>
          )}

          {regularPosts.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold">โพสต์ทั่วไป</h2>
              {regularPosts?.map((post) => (
                <div key={post.id} className="mb-4">
                  <PostItem post={post} />
                </div>
              ))}
            </div>
          )}

          {posts.length === 0 && (
            <p className="text-gray-500 text-center">ยังไม่มีโพสต์ในตอนนี้</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;
