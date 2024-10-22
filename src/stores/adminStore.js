import axios from "axios";
import { create } from "zustand";

const useAdminStore = create((set, get) => ({
  deleteBoardGame: async (token, id) => {
    await axios.delete(`http://localhost:8000/admin/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}));

export default useAdminStore;
