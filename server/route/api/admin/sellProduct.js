const collection_sell_manageService = require("../../../service/collection_sell_manageService");
const express = require("express");
const { asyncHandler } = require("../../getSendResult");
const { createCId } = require("../../../utils/createCId");
const router = express.Router();
const moment = require('moment')

router.post(
  "/addNewProduct",
  asyncHandler(async req => {
    const cId = createCId();
    const result = await collection_sell_manageService.addCollection_sell_manage({
      cId,
      cName: req.body.cName,
      url: req.body.url,
      circulation: req.body.circulation,
      sumstock: req.body.sumstock,
      auther: req.body.auther,
      price: req.body.price,
      limit_price: req.body.limit_price,
      sellTime: moment(new Date(+req.body.sellTime)).format('YYYY-MM-DD HH:mm:ss'),
      isUpdate: req.body.isUpdate,
      isBusiness: req.body.isBusiness,
    });
    return [result, 0, 'success']
  })
);

router.post(
  "/openBusiness",
  asyncHandler(async req => {
    const result = await collection_sell_manageService.updateIsBusiness(req.body.cId, req.body.isBusiness);
    return [result, 0, 'success']
  })
);

router.post(
  "/openIsUpdate",
  asyncHandler(async req => {
    console.log(req.body.cId, req.body.isUpdate)
    const result =  await collection_sell_manageService.updateIsUpdate(req.body.cId, req.body.isUpdate);
    return [result, 0, 'success']
  })
);

module.exports = router;
