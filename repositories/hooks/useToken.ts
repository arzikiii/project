export const getToken = () => {
  let userToken;

  if (typeof window !== "undefined") {
    userToken = localStorage.getItem("user");
    if (userToken !== null) {
      return userToken;
    }
  }
  return null;
};
