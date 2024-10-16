import axios from "axios";
import { create } from "zustand";

const useBoardgameStore = create((set, get) => ({
  boardgames: [],
  getAllBoardGames: async (token) => {
    const result = await axios.get("http://localhost:8000/boardgames", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    set({ boardgames: result.data.data });
  },
  viewBoardGame: async (token, id) => {
    const result = await axios.get(`http://localhost:8000/boardgames/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  },
}));

export default useBoardgameStore;
