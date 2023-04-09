const { getErr } = require("./getSendResult");
const { pathToRegexp } = require("path-to-regexp");
const jwt = require("./jwt");
const needTokenApi = [
  { method: "GET", path: "/api/client/my/getUserInfo" },
  { method: "GET", path: "/api/client/my/getUserProduct" },
  { method: "GET", path: "/api/client/my/getPoints" },
  { method: "GET", path: "/api/client/my/pointsSign" },
  { method: "POST", path: "/api/client/my/openWallet" },
  { method: "POST", path: "/api/client/my/getUserProductSeriNum" },
  { method: "POST", path: "/api/client/order/createByMarket" },
  { method: "POST", path: "/api/client/order/createByAdmin" },
  { method: "POST", path: "/api/client/user/realname" },
  { method: "POST", path: "/api/client/market/getProductInfo" },
  { method: "POST", path: "/api/client/my/publishCollection" },
  { method: "POST", path: "/api/client/my/cancelSelling" },
];

// 用于解析token
module.exports = (req, res, next) => {
  // /api/student/:id 和  /api/student/1771
  const apis = needTokenApi.filter((api) => {
    const reg = pathToRegexp(api.path);
    return api.method === req.method && reg.test(req.path);
  });
  if (apis.length === 0) {
    next();
    return;
  }
  const result = jwt.verify(req);
  if (result) {
    //认证通过
    console.log(result)
    req.uId = result.uId;
    req.account = result.account
    next();
  } else {
    //认证失败
    handleNonToken(req, res, next);
  }
};

//处理没有认证的情况
function handleNonToken(req, res, next) {
  res
    .status(403)
    .send(getErr("you dont have any token to access the api", 403));
}