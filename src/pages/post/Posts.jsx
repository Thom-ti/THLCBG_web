import { useEffect, useState } from "react";
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
  }, []);

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
          {posts?.length > 0 ? (
            posts.map((post) => <PostItem key={post.id} post={post} />)
          ) : (
            <p className="text-gray-500 text-center">ยังไม่มีโพสต์ในตอนนี้</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;
