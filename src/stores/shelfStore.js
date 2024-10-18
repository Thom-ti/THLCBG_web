import axios from "axios";
import { create } from "zustand";

const useShelfStore = create((set, get) => ({
  myShelf: [],
  addToShelf: async (token, body) => {
    const result = await axios.post(`http://localhost:8000/boardgames/`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    set({ myShelf: result.data.data });
    return result;
  },
  getMyShelf: async (token) => {
    try {
      const result = await axios.get("http://localhost:8000/myshelf", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ myShelf: result.data.shelf[0].shelfBoardgames });
    } catch (err) {
      console.log(err);
    }
  },
  updateStatus: async (token, body, id) => {
    try {
      const result = await axios.patch(
        `http://localhost:8000/myshelf/${id}`,
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
  deleteFromShelf: async (token, id) => {
    await axios.delete(`http://localhost:8000/myshelf/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
}));

export default useShelfStore;
