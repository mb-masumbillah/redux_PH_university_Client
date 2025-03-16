import { jwtDecode } from "jwt-decode";

export const veryfyToken = (token: string) => {
  return jwtDecode(token);
};
