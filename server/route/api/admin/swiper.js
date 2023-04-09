const swiperService = require("../../../service/swiperService");
const express = require("express");
const { asyncHandler } = require("../../getSendResult");
const router = express.Router();

router.get(
  "/swiperlistAll",
  asyncHandler(async () => {
    const result = await swiperService.querySwiperAll();
    return [result, 0, "success"];
  })
);
router.post(
  "/addSwiper",
  asyncHandler(async req => {
    const result = await swiperService.addSwiper({
      url: req.body.url,
      path: req.body.path,
      isVisible: req.body.isVisible,
    });
    return [result, 0, "success"];
  })
);

router.post(
  "/updateSwiperVisible",
  asyncHandler(async req => {
    console.log(req.body.sId,
      req.body.isVisible)
    const result = await swiperService.updateSwiperVisible(
      req.body.sId,
      req.body.isVisible
    );
    return [result, 0, "success"];
  })
);

router.delete(
  "/delSwiper",
  asyncHandler(async req => {
    const result = await swiperService.delSwiper(req.query.sid);
    return [result, 0, "success"];
  })
);

module.exports = router;
