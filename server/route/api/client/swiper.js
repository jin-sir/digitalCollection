const swiperService = require("../../../service/swiperService");
const express = require("express");
const { asyncHandler } = require("../../getSendResult");
const router = express.Router();

router.get(
  "/getSwiperlist",
  asyncHandler(async () => {
    const result = await swiperService.querySwiperByVisible();
    return [result, 0, "success"];
  })
);

module.exports = router;
