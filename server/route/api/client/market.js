const collection_sellingService = require("../../../service/collection_sellingService");
const collection_holdingsService = require("../../../service/collection_holdingsService");
const collection_sell_manageService = require("../../../service/collection_sell_manageService");
const express = require("express");
const { asyncHandler } = require("../../getSendResult");
const router = express.Router();
const moment = require("moment")
moment.locale("zh-cn");

router.get(
  "/getProduct",
  asyncHandler(async req => {
    const result = await collection_sell_manageService.queryMarketByPage(
      +req.query.page,
      +req.query.limit
    );
    return [result, 0, "success"];
  })
);

router.get(
  "/getProductList",
  asyncHandler(async req => {
    const result = await collection_sellingService.queryGoodsListByPage(
      req.query.cId,
      +req.query.page,
      +req.query.limit,
      req.query.sort
    );
    for(let i =0; i < result.length; i++) {
      const disTime = moment().diff(moment(result[i].lock_time)) / 1000
      result[i].dataValues.lock_time = disTime < 180
    }
    // console.log(result)
    return [result, 0, "success"];
  })
);
// 获取藏品信息
router.post(
  "/getProductInfo",
  asyncHandler(async req => {
    let result;
    let mode = {};
    if (req.body.mode === "market") {
      result = await collection_sellingService.queryGoods(
        req.body.cId,
        req.body.seri_num
      );
      if (result.uId === req.uId) {
        mode.mode = "my_digitalCollection";
      }
      console.log(result);
    } else {
      result = await collection_holdingsService.queryGoods(
        req.uId,
        req.body.cId,
        req.body.seri_num
      );
    }
    const data = {
      ...result.t_collection_sell_manage,
      ...mode,
      cId: result.cId,
      id: result.id,
      seri_num: result.seri_num,
      state: result.state,
      price: result.selling_price,
    };
    return [data, 0, "success"];
  })
);

module.exports = router;
