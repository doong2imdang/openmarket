import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const isModalOpen = atom({
  key: "isModalOpen",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const modalItems = atom({
  key: "modalItems",
  default: [],
  effect_UNSTABLE: [persistAtom],
});

export const isProductInCartState = atom({
  key: "isProductInCartState",
  default: false,
});
