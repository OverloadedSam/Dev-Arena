const tokenKey = "token";
const userKey = "user";

export const saveUserAndAuthToken = (token, user) => {
    localStorage.setItem(tokenKey, token);
    localStorage.setItem(userKey, JSON.stringify(user));
};

export const getCurrentUser = () => {
    const user = JSON.parse(localStorage.getItem(userKey));
    return user ? user : null;
};

export const getAuthToken = () => {
    const token = localStorage.getItem(tokenKey);
    return token ? token : null;
};

export const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
};

const auth = {
    saveUserAndAuthToken,
    getCurrentUser,
    getAuthToken,
    logout,
};

export default auth;
