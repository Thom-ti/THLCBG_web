import axios from "axios";
import { create } from "zustand";

const useAdminStore = create((set, get) => ({
  addBoardGame: async (token, body) => {
    const result = await axios.post("http://localhost:8000/admin", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  },
  deleteBoardGame: async (token, id) => {
    await axios.delete(`http://localhost:8000/admin/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
}));

export default useAdminStore;
