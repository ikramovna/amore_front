import { getToken, setToken } from "@/helpers/persistaneStorage";
import { IToken } from "@/interface";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://npspersonal.uz/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token: IToken = getToken();

    config.headers.Authorization = token ? `Bearer ${token.access}` : "";
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalConfig = error.config;

    if (error.response.status === 403 && !originalConfig._retry) {
      originalConfig._retry = true;

      try {
        const { refresh }: IToken = getToken();
        if (refresh) {
          const { data } = await instance.post("/user/login-refresh", {
            refresh: refresh,
          });

          const access = data.access;
          setToken(data);
          instance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${access}`;
        }
      } catch (e) {
        console.log("xatolik", e);
      }

      return instance(originalConfig);
    }

    return Promise.reject(error);
  }
);

export default instance;
