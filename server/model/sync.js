require("./Admin");
require("./Announcement");
require("./Collection_sell_manage");
require("./Collection_holdings");
require("./Collection_selling");
require("./Order_list");
require("./Points");
require("./Realname");
require("./Swiper");
require("./User");
require("./Veri_code")
const sequelize = require("./db");

sequelize.sync({ alter: true }).then(() => {
  console.log("所有模型同步完成");
});
