
export const getLocalStorage = () => {
    if (typeof window !== 'undefined' && localStorage.getItem("userInfo")) {
        const user = JSON.parse(String(localStorage.getItem("userInfo")));
        return user;
    }
    return {}
}