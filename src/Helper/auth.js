import Cookies from "js-cookie";
import Router from "next/router";

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
  Router.reload();
};
export const removeCookieTokenWithOutReload = () => {
  if (typeof window === "undefined") return;
  Cookies.remove("id");
  Cookies.remove("username");
  Cookies.remove("jwt");
};
export const getCookieToken = () => {
  return typeof window === "undefined" ? undefined : Cookies.get("jwt");
};

export const setCookieUrlPath = (path) => {
  if (typeof window === "undefined") return;
  Cookies.set("path", path);
};
export const getCookieUrlPath = () => {
  return typeof window === "undefined" ? undefined : Cookies.get("path");
};

export const removeCookieUrlPath = () => {
  if (typeof window === "undefined") return;
  Cookies.remove("path");
};
