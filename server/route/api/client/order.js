const orderListService = require("../../../service/orderListService");
const pointsService = require("../../../service/pointsService");
const collection_sell_manageService = require("../../../service/collection_sell_manageService");
const collection_holdingsService = require("../../../service/collection_holdingsService");
const express = require("express");
const { asyncHandler } = require("../../getSendResult");
const router = express.Router();

router.get(
  "/getOrderList",
  asyncHandler(async req => {
    return await orderListService.queryOrder_list(
      req.uId,
      req.query.page,
      req.query.limit
    );
  })
);
router.post(
  "/createByMarket",
  asyncHandler(async req => {
    console.log(req.uId);
    const row = await pointsService.queryPoints(req.uId);
    console.log(row);
    if (row === null) {
      return [row, 1, "请开通钱包"];
    }
    // 判断钱够不够
    // return await orderListService.addOrder_list(
    //   {
    //     uId:req.uId,
    //     tCollectionSellingId: req.body.cId,
    //     sell_state: req.body.sell_state
    //   }
    // );
  })
);

router.post(
  "/createByAdmin",
  asyncHandler(async req => {
    console.log(req.uId);
    const points = await pointsService.queryPoints(req.uId);
    console.log(points);
    if (points === null) {
      return [null, 1, "请开通钱包"];
    }
    const product = await collection_sell_manageService.queryProductInfo(
      req.body.cId
    );
    console.log(product);
    // 判断积分够不够
    if (points.points < product.price) {
      return [null, 1, "积分不足"];
    }
    // await orderListService.addOrder_list()
    console.log({
      cId: req.body.cId,
      uId: req.uId,
      seri_num: product.sumstock + 1,
      state: true
    })
    await collection_holdingsService.addCollection_holdings({
      cId: req.body.cId,
      uId: req.uId,
      seri_num: product.sumstock + 1,
      state: true
    });
    await collection_sell_manageService.updateSumstock(req.body.cId, product.sumstock + 1);
    return [null, 0, "购买成功"];
  })
);

module.exports = router;
