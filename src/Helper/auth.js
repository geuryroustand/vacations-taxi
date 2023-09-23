import Cookies from "js-cookie";
// import Router from "next/router";

export const setCookieToken = (data) => {
  if (typeof window === "undefined") return;
  Cookies.set("id", data.user.id);
  Cookies.set("username", data.user.username);
  Cookies.set("jwt", data.jwt);

  // if (Cookies.get("username")) Router.reload("/");
};
export const removeCookieToken = () => {
  if (typeof window === "undefined") return;
  Cookies.remove("id");
  Cookies.remove("username");
  Cookies.remove("jwt");
};

export const getCookieToken = (data) => {
  if (typeof window === "undefined") return;
  Cookies.get("id", data.user.id);
  Cookies.get("username", data.user.username);
  Cookies.get("jwt", data.jwt);
};
