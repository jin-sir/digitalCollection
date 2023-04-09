const announcementService = require("../../../service/announcementService");
const express = require("express");
const { asyncHandler } = require("../../getSendResult");
const router = express.Router();

router.get(
  "/getAnnouncement",
  asyncHandler(async req => {
    return await announcementService.getAnnouncementByPage(
      req.query.page,
      req.query.limit
    );
  })
);
router.get(
  "/getAnnouncementDetail",
  asyncHandler(async (req) => {
      const result = await announcementService.getAnnouncementById(req.query.infoId);
      return [result, 0, 'success']
  })
);
router.get(
  "/getTitle",
  asyncHandler(async req => {
    const result = await announcementService.getTitle(
      req.query.page,
      req.query.limit
    );
    return [result, 0, 'success']
  })
);


module.exports = router;
