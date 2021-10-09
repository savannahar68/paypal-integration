import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import router from "next/router";
import Toastr from "../component/Toastr";

if (process.env.NODE_ENV === "production") {
  // prettier-ignore
  axios.defaults.baseURL = "https://api.xyz.com/api/";
} else {
  axios.defaults.baseURL = "http://localhost:5000/api/";
}

const handleSuccessResponse = (response: AxiosResponse) => {
  if (response) {
    if (response.data.notice) {
      Toastr.success(response.data.notice);
    }
  }
  return response;
};

const handleErrorResponse = (error: AxiosError) => {
  if (error.response?.data.notice) {
    Toastr.error(error.response.data.notice);
  } else if (error.response?.data.ERR_CODE) {
    // REMOVE JWT localStorage.removeItem(LOCAL_STORAGE_JWT_KEY);
    router.push("/login");
  }
  return Promise.reject(error);
};

const handleRequest = (request: AxiosRequestConfig) => {
  request.headers["x-auth-token"] = "123"; // SET JWT localStorage.getItem(LOCAL_STORAGE_JWT_KEY);
  return request;
};

export const registerIntercepts = () => {
  axios.interceptors.response.use(handleSuccessResponse, (error) =>
    handleErrorResponse(error)
  );
  axios.interceptors.request.use(handleRequest);
};
