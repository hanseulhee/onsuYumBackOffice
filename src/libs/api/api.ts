import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import { API_BASE_URL } from "constants/common";

export const instance = axios.create({
  baseURL: API_BASE_URL,
});

axios.defaults.withCredentials = true;

function requestInterceptor(config: AxiosRequestConfig) {
  return {
    ...config,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      withCredentials: true,
      Accept: "*/*",
      "Content-Type": "application/json",
    },
  };
}

instance.interceptors.request.use(requestInterceptor);

function responsefulfilledInterceptor(res: AxiosResponse) {
  if (200 <= res.status && res.status < 300) {
    return res.data;
  }
  return Promise.reject(res.data);
}

function responseRejectedInterceptor(error: AxiosError) {
  return error;
}

instance.interceptors.response.use(
  responsefulfilledInterceptor,
  responseRejectedInterceptor
);

export function get<T>(...args: Parameters<typeof instance.get>) {
  return instance.get<T, T>(...args);
}

export function post<T>(...args: Parameters<typeof instance.post>) {
  return instance.post<T, T>(...args);
}

export function put<T>(...args: Parameters<typeof instance.put>) {
  return instance.put<T, T>(...args);
}

export function patch<T>(...args: Parameters<typeof instance.patch>) {
  return instance.patch<T, T>(...args);
}

export function del<T>(...args: Parameters<typeof instance.delete>) {
  return instance.delete<T, T>(...args);
}
