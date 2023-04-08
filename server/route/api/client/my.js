const userService = require("../../../service/userService");
const collection_holdingsService = require("../../../service/collection_holdingsService");
const pointsService = require("../../../service/pointsService");
const express = require("express");
const { asyncHandler } = require("../../getSendResult");
const router = express.Router();
const compareDate = require("../../../utils/compareDate");
const moment = require("moment");
moment.locale("zh-cn");

router.get(
  "/getUserInfo",
  asyncHandler(async req => {
    const result = await userService.queryUserInfo(req.uId);
    return [result, 0, "success"];
  })
);
router.get(
  "/getUserProduct",
  asyncHandler(async req => {
    const result = await collection_holdingsService.queryCollection_holdings(
      req.uId,
      +req.query.page,
      +req.query.limit
    );
    return [result, 0, "success"];
  })
);
router.post(
  "/getUserProductSeriNum",
  asyncHandler(async req => {
    const result = await collection_holdingsService.queryCollectionByCId(
      req.uId,
      req.body.cId
    );
    return [result, 0, "success"];
  })
);
router.get(
  "/getPoints",
  asyncHandler(async req => {
    const result = await pointsService.queryPoints(req.uId);
    if (result === null) {
      return [result, 1, "error"];
    }
    const data = {
      points: result.points,
      isSign: !compareDate(result.sign_time),
    };
    return [data, 0, "success"];
  })
);
router.post(
  "/openWallet",
  asyncHandler(async req => {
    try {
      const result = await pointsService.addPoints({
        uId: req.uId,
        points: 0,
        sign_time: moment(new Date(0)).format("YYYY-MM-DD HH:mm:ss"),
      });
      return [result, 0, "success"];
    } catch (e) {
      return [null, 1, "已开通钱包"];
    }
  })
);
router.get(
  "/pointsSign",
  asyncHandler(async req => {
    const pointsObj = await pointsService.queryPoints(req.uId);
    if (pointsObj === null) {
      return [null, 1, "你还未开通钱包"];
    }
    if (compareDate(pointsObj.sign_time)) {
      try {
        await pointsService.updatePoints(
          req.uId,
          pointsObj.points + 1,
          moment().format("YYYY-MM-DD HH:mm:ss")
        );
        return [null, 0, "签到成功"];
      } catch (e) {
        return [null, 1, "签到失败，请联系官方"];
      }
    } else {
      return [null, 0, "今天已签到"];
    }
  })
);

module.exports = router;
