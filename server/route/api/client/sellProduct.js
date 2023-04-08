const collection_sell_manageService = require("../../../service/collection_sell_manageService");
const express = require("express");
const { asyncHandler } = require("../../getSendResult");
const router = express.Router();

router.get(
  "/getNewProduct",
  asyncHandler(async req => {
    const result = await collection_sell_manageService.queryCollection_sell_manageByPage(
      req.query.page,
      req.query.limit
    );
    console.log(result)
    return [result, 0, 'success']
  })
);
router.get(
  "/getNewProductAll",
  asyncHandler(async () => {
    return await collection_sell_manageService.queryCollection_sell_manage();
  })
);
router.get(
  "/getProduct",
  asyncHandler(async req => {
    return await collection_sell_manageService.queryMarketByPage(
      req.query.page,
      req.query.limit
    );
  })
);

router.get(
  "/getNewProductInfo",
  asyncHandler(async req => {
    const result = await collection_sell_manageService.queryProductInfo(
      req.query.cId
    );
    return [result, 0, 'success']
  })
);

module.exports = router;
