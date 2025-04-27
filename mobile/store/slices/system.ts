import { Dispatch, SetStateAction } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
//custom imports
import productConfig from "@mobile/lib/product";
import secureStorage from "../storage/secure-storage";
// import { zustandStorage } from "../storage-mmkv";

const STORAGE_KEY = `${productConfig.identifier}-system`;

interface StoreState {
  colorScheme: "light" | "dark" | "system";
  setColorScheme: Dispatch<SetStateAction<"light" | "dark" | "system">>;
}

export const useSystemStore = create(
  persist(
    (set) => ({
      colorScheme: "light" as "light" | "dark" | "system",
      setColorScheme: (
        payload: React.SetStateAction<"light" | "dark" | "system">
      ) => {
        set((state) => ({
          colorScheme:
            typeof payload === "function"
              ? payload(state.colorScheme)
              : payload,
        }));
      },
    }),
    {
      name: STORAGE_KEY, // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => secureStorage),
      // storage: createJSONStorage(() => zustandStorage), // (optional) by default, 'localStorage' is used
      partialize: (state: StoreState) => ({
        colorScheme: state.colorScheme,
      }),
    }
  )
);

export default useSystemStore;
