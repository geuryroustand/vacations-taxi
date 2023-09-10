import Cookies from "js-cookie";

export const setCookieToken = (data) => {
  if (typeof window === "undefined") return;
  Cookies.set("id", data.user.id);
  Cookies.set("username", data.user.username);
  Cookies.set("lastname", data.user.lastname);
  Cookies.set("jwt", data.jwt);
};
export const removeCookieToken = () => {
  if (typeof window === "undefined") return;
  Cookies.remove("id");
  Cookies.remove("username");
  Cookies.remove("lastname");
  Cookies.remove("jwt");
};
