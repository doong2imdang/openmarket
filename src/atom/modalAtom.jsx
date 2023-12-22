import { atom, selector, useRecoilCallback } from "recoil";
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

export const setProductInCartState = selector({
  key: "setProductInCartState",
  set: ({ set }, value) => {
    set(isProductInCartState, value);
  },
});
