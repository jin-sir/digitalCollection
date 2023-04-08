const announcementService = require("../../../service/announcementService");
const express = require("express");
const { asyncHandler } = require("../../getSendResult");
const router = express.Router();


router.post(
  "/addAnnouncement",
  asyncHandler(async req => {
    const result = await announcementService.addAnnouncement({
      tag: req.body.tag,
      title: req.body.title,
      content: req.body.content
    });
    return [result, 0, 'success']
  })
);


module.exports = router;
