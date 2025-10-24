export const getUsers = () => JSON.parse(localStorage.getItem("users")) || [];

export const saveUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

export const getAuthUser = () => JSON.parse(localStorage.getItem("authUser"));

export const setAuthUser = (user) => {
  localStorage.setItem("authUser", JSON.stringify(user));
};

export const logoutUser = () => {
  localStorage.removeItem("authUser");
};
