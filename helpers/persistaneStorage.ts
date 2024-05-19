import { IToken } from "@/interface";

export const getToken = () => {
  try {
    const res = localStorage.getItem("token");
    return res && JSON.parse(res);
  } catch (error) {
    console.log(error);
  }
};
export const setToken = (data: IToken) => {
  try {
    return localStorage.setItem("token", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export const removeToken = () => {
  try {
    localStorage.removeItem("token");
  } catch (error) {
    console.log(error);
  }
};
