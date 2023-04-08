const collection_sellingService = require("../../../service/collection_sellingService");
const collection_holdingsService = require("../../../service/collection_holdingsService");
const collection_sell_manageService = require("../../../service/collection_sell_manageService");
const express = require("express");
const { asyncHandler } = require("../../getSendResult");
const router = express.Router();

router.get(
  "/getProduct",
  asyncHandler(async req => {
    const sort = req.query.sort ? "desc" : "asc";
    return await collection_sell_manageService.queryMarketByPage(
      req.query.page,
      req.query.limit,
      sort
    );
  })
);

router.get(
  "/getProductList",
  asyncHandler(async req => {
    const sort = req.query.sort ? "desc" : "asc";
    return await collection_sellingService.queryGoodsListByPage(
      req.query.cId,
      req.query.page,
      req.query.limit,
      sort
    );
  })
);
router.post(
  "/getProductInfo",
  asyncHandler(async req => {
    console.log(req.body)
    const result = await collection_holdingsService.queryGoods(
      req.uId,
      req.body.cId,
      req.body.seri_num
    );
    console.log(result)
    const data = {
      ...result.t_collection_sell_manage,
      cId: result.cId,
      id: result.id,
      seri_num: result.seri_num,
      state: result.state
    }
    return [data, 0, 'success']
  })
);

module.exports = router;
