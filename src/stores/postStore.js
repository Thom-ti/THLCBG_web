import axios from "axios";
import { create } from "zustand";

const usePostStore = create((set, get) => ({
  posts: [],
  getAllPosts: async (token) => {
    const result = await axios.get("http://localhost:8000/posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    set({ posts: result.data.data });
  },
  viewPost: async (token, id) => {
    const result = await axios.get(`http://localhost:8000/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  },
  createPost: async (token, body) => {
    const result = await axios.post("http://localhost:8000/posts", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    set({ posts: result.data.data });
    return result;
  },
  updatePost: async (token, body, id) => {
    try {
      const result = await axios.patch(
        `http://localhost:8000/posts/${id}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return result;
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (token, id) => {
    await axios.delete(`http://localhost:8000/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
}));

export default usePostStore;
