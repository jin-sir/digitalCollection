const userService = require("../../../service/userService");
const express = require("express");
const { asyncHandler } = require("../../getSendResult");
const router = express.Router();

router.get(
  "/getUserInfo",
  asyncHandler(async req => {
    return await userService.queryUserInfo(
      req.query.account
    );
  })
);
router.get(
  "/getAnnouncementDetail",
  asyncHandler(async (req) => {
    return await announcementService.getAnnouncementById(req.body.infoId);
  })
);
router.get(
  "/getTitle",
  asyncHandler(async req => {
    return await announcementService.getTitle(
      req.query.page,
      req.query.limit
    );
  })
);
router.post(
  "/addAnnouncement",
  asyncHandler(async req => {
    return await announcementService.addAnnouncement({
      tag: req.body.tag,
      title: req.body.title,
      content: req.body.content
    });
  })
);


module.exports = router;
