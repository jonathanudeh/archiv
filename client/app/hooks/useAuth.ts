export const useAuth = () => {
  const token = typeof window !== "undefined" ? "cookie goes here" : null;

  const isAuthenticated = !!token;

  return { isAuthenticated };
};
