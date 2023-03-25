// const path = require("path");

module.exports = {
  productionSourceMap: false,

  // outputDir: './myDist',
  //   publicPath:
  //     process.env.NODE_ENV === "production" ? "http://www.baidu.com" : "/",

  devServer: {
    proxy: {
      "/api/": {
        target: "http://localhost:3000"
      }
    }
  }
};
