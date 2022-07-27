import { atom, useRecoilState } from "recoil";

const authenticated = atom({
  key: "authenticated",
  default: {
    user: {},
  },
});

export const useAuthenticated = () => useRecoilState(authenticated);
