import jwtDecode from "jwt-decode";

export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  try {
    const { exp }: { exp: any } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
      localStorage.removeItem("token");
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
};
