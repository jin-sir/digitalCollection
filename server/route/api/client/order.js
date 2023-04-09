const orderListService = require("../../../service/orderListService");
const pointsService = require("../../../service/pointsService");
const collection_sell_manageService = require("../../../service/collection_sell_manageService");
const collection_holdingsService = require("../../../service/collection_holdingsService");
const collection_sellingService = require("../../../service/collection_sellingService");
const express = require("express");
const { asyncHandler } = require("../../getSendResult");
const router = express.Router();
const moment = require("moment");
moment.locale("zh-cn");

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
    const product = await collection_sellingService.queryGoods(
      req.body.cId,
      req.body.seri_num
    );
    if (!product) {
      return [null, 1, "商品不存在"];
    }
    const disTime = moment().diff(moment(product.lock_time)) / 1000;
    if (disTime < 3 * 60) {
      return [null, 1, "已被他人锁定"];
    }
    await collection_sellingService.updateLockTime(
      req.body.cId,
      req.body.seri_num,
      moment().format("YYYY-MM-DD HH:mm:ss")
    );
    const points = await pointsService.queryPoints(req.uId);
    if (points === null) {
      return [row, 1, "请开通钱包"];
    }
    // 判断积分够不够
    if (points.points < product.selling_price) {
      return [null, 1, "积分不足"];
    }
    const sendPoints = await pointsService.queryPoints(product.uId);
    console.log(sendPoints);
    await pointsService.updatePoints(
      req.uId,
      points.points - product.selling_price
    );
    await pointsService.updatePoints(
      sendPoints.uId,
      sendPoints.points + product.selling_price
    );
    await collection_holdingsService.addCollection_holdings({
      cId: req.body.cId,
      uId: req.uId,
      seri_num: product.seri_num,
      state: true,
    });
    await collection_holdingsService.deleteHoldingGoods(
      product.uId,
      req.body.cId,
      product.seri_num
    );
    await collection_sellingService.deleteSellingLog(
      product.uId,
      req.body.cId,
      product.seri_num
    );
    return [null, 0, "购买成功"];
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
      state: true,
    });
    await collection_holdingsService.addCollection_holdings({
      cId: req.body.cId,
      uId: req.uId,
      seri_num: product.sumstock + 1,
      state: true,
    });
    await collection_sell_manageService.updateSumstock(
      req.body.cId,
      product.sumstock + 1
    );
    await pointsService.updatePoints(req.uId, points.points - product.price);
    return [null, 0, "购买成功"];
  })
);

module.exports = router;
