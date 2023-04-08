const express = require("express");
const app = express();
const cors = require("cors");

const history = require("connect-history-api-fallback");
app.use(history());

const path = require("path");
const staticRoot = path.resolve(__dirname, "../public");
app.use(express.static(staticRoot));

app.use(express.urlencoded({ extended: true }));

// 加入cookie-parser 中间件
// 加入之后，会在req对象中注入cookies属性，用于获取所有请求传递过来的cookie
// 加入之后，会在res对象中注入cookie方法，用于设置cookie
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const whiteList = ["null", "http://localhost:3000", "http://192.168.123.225:3000"];
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        callback(null, "*");
        return;
      }
      if (whiteList.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error("not allowed"));
      }
    },
    credentials: true,
  })
);

// 应用token中间件
app.use(require("./tokenMiddleware"));

app.use(express.json());

app.use("/api/client/user", require("./api/client/user"));

app.use("/api/client/sellProduct", require("./api/client/sellProduct"));

app.use("/api/client/my", require("./api/client/my"));

app.use("/api/client/market", require("./api/client/market"));

app.use("/api/client/announcement", require("./api/client/announcement"));

app.use("/api/client/swiper", require("./api/client/swiper"));

app.use("/api/client/order", require("./api/client/order"));

app.use("/api/admin/sellProduct", require("./api/admin/sellProduct"));

app.use("/api/admin/announcement", require("./api/admin/announcement"));

app.use("/api/admin/swiper", require("./api/admin/swiper"));

app.use(require("./errorMiddleware"));

const port = 12306;
app.listen(port, () => {
  console.log(`server listen on ${port}`);
});
