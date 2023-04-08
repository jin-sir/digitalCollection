import axios from "axios";

const basePath = "http://localhost:12306";
const instance = axios.create({
  baseURL: basePath,
  timeout: 20000,
});
instance.defaults.withCredentials = true;
export default instance;
