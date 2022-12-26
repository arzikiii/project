export const getToken = () => {
  let userToken = null;

  if (typeof window !== "undefined") {
    userToken = localStorage.getItem("user");
  }

  if (userToken !== null) {
    return userToken;
  }

  return null;
};
