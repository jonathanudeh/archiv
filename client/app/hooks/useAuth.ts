export const useAuth = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const isAuthenticated = !!token;

  return { isAuthenticated };
};
