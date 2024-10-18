import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: "",
      login: async (input) => {
        const result = await axios.post(
          "http://localhost:8000/auth/login",
          input
        );
        set({ user: result.data.user, token: result.data.token });
      },
      register: async (input) => {
        const result = await axios.post(
          "http://localhost:8000/auth/register",
          input
        );
      },
      logout: () => set({ user: null, token: "" }),
      currentUser: async (token) => {
        const result = await axios.post(
          "http://localhost:8000/auth/current-user",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return result;
      },
    }),
    {
      name: "state",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
