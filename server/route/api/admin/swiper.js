const swiperService = require("../../../service/swiperService");
const express = require("express");
const { asyncHandler } = require("../../getSendResult");
const router = express.Router();

router.get(
  "/swiperlistAll",
  asyncHandler(async () => {
    return await swiperService.querySwiperAll();
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

router.delete(
  "/delSwiper",
  asyncHandler(async req => {
    return await swiperService.delSwiper(req.body.sid);
  })
);

module.exports = router;
