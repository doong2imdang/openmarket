import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const productImage = atom({
  key: "productImage",
  default: "",
  effect_UNSTABLE: [persistAtom],
});
