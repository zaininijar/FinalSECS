import { atom, useRecoilState } from "recoil";

const authenticated = atom({
  key: "authenticated",
  default: {
    check: false,
    user: null,
  },
});

export const useAuthenticated = () => useRecoilState(authenticated);
