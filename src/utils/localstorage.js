export const addAccessToken = (t) => localStorage.setItem("accessToken", t);
export const getAccessToken = () => localStorage.getItem("accessToken");
export const removeAccessToken = () => localStorage.removeItem("accessToken");

export const setUser = (u) => localStorage.setItem("user", JSON.stringify(u));
export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
};
export const removeUser = () => localStorage.removeItem("user");
