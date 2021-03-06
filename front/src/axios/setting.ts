import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.withCredentials = true;
export const axiosAuthorization = () => {
  const token = () => localStorage.getItem("token");
  axios.defaults.headers.common.Authorization = `Bearer ${token()}`;
};
axiosAuthorization();
axios.defaults.headers.post["Access-Control-Allow-Origin"] =
  process.env.REACT_APP_API_URL;
