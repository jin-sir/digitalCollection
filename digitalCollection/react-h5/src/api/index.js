import axios from "./request";

// const basePath = "http://192.168.123.225:12306";
const basePath = "http://localhost:12306";
const userPath = "/api/client/user";
const myPath = "/api/client/my";
const announcementPath = "/api/client/announcement";
const sellProductPath = "/api/client/sellProduct";
const swiperPath = "/api/client/swiper";
const orderPath = "/api/client/order";
const marketPath = "/api/client/market";

const home = "/api/blogArticle";
const tagPath = "/api/tag";
const commentPath = "/api/comment";
const leaveMessagePath = "/api/leaveMessage";
const info = "/api/info";

const getVeriCode = params => {
  return axios
    .get(`${basePath}${userPath}/getVeriCode`, { params })
    .then(res => res.data);
};
const resigter = data => {
  return axios
    .post(`${basePath}${userPath}/resigter`, data)
    .then(res => res.data);
};
const login = data => {
  return axios.post(`${basePath}${userPath}/login`, data).then(res => res.data);
};

const realname = data => {
  return axios
    .post(`${basePath}${userPath}/realname`, data)
    .then(res => res.data);
};
const getUserInfo = data => {
  return axios
    .get(`${basePath}${myPath}/getUserInfo`, data)
    .then(res => res.data);
};
const getPoints = params => {
  return axios
    .get(`${basePath}${myPath}/getPoints`, { params })
    .then(res => res.data);
};

const openWallet = data => {
  return axios
    .post(`${basePath}${myPath}/openWallet`, data)
    .then(res => res.data);
};

const pointsSign = params => {
  return axios
    .get(`${basePath}${myPath}/pointsSign`, { params })
    .then(res => res.data);
};

const getUserProduct = params => {
  return axios
    .get(`${basePath}${myPath}/getUserProduct`, { params })
    .then(res => res.data);
};

const getUserProductSeriNum = data => {
  return axios
    .post(`${basePath}${myPath}/getUserProductSeriNum`, data)
    .then(res => res.data);
};

const getTitle = params => {
  return axios
    .get(`${basePath}${announcementPath}/getTitle`, { params })
    .then(res => res.data);
};

const getNewProduct = params => {
  return axios
    .get(`${basePath}${sellProductPath}/getNewProduct`, { params })
    .then(res => res.data);
};
const getNewProductInfo = params => {
  return axios
    .get(`${basePath}${sellProductPath}/getNewProductInfo`, { params })
    .then(res => res.data);
};
const getSwiperlist = params => {
  return axios
    .get(`${basePath}${swiperPath}/getSwiperlist`, { params })
    .then(res => res.data);
};

const createByAdmin = data => {
  return axios
    .post(`${basePath}${orderPath}/createByAdmin`, data)
    .then(res => res.data);
};

const createByMarket = data => {
  return axios
    .post(`${basePath}${orderPath}/createByMarket`, data)
    .then(res => res.data);
};

const getProductInfo = data => {
  return axios
    .post(`${basePath}${marketPath}/getProductInfo`, data)
    .then(res => res.data);
};
const publishCollection = data => {
  return axios
    .post(`${basePath}${myPath}/publishCollection`, data)
    .then(res => res.data);
};
const cancelSelling = data => {
  return axios
    .post(`${basePath}${myPath}/cancelSelling`, data)
    .then(res => res.data);
};
export {
  getVeriCode,
  resigter,
  login,
  realname,
  getUserInfo,
  getPoints,
  openWallet,
  pointsSign,
  getUserProduct,
  getUserProductSeriNum,
  getTitle,
  getNewProduct,
  getSwiperlist,
  getNewProductInfo,
  createByAdmin,
  createByMarket,
  getProductInfo,
  publishCollection,
  cancelSelling,
};
