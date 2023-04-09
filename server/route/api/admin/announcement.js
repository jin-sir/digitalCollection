const announcementService = require("../../../service/announcementService");
const express = require("express");
const { asyncHandler } = require("../../getSendResult");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const staticRoot = path.resolve(__dirname, "../../../public/images");
const createImageName = require("../../../utils/createImageName");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, staticRoot);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, createImageName().toString() + ext);
  },
});
const upload = multer({ storage });

console.log(staticRoot);
router.post(
  "/addAnnouncement",
  asyncHandler(async req => {
    const result = await announcementService.addAnnouncement({
      tag: req.body.tag,
      title: req.body.title,
      content: req.body.content,
    });
    return [result, 0, "success"];
  })
);

router.post(
  "/updateAnnouncement",
  asyncHandler(async req => {
    console.log(req.query);
    const result = await announcementService.updateAnnouncement(
      req.query.infoId,
      {
        tag: req.body.tag,
        title: req.body.title,
        content: req.body.content,
      }
    );
    return [result, 0, "success"];
  })
);

router.get(
  "/deleteAnnouncement",
  asyncHandler(async req => {
    console.log(req.query);
    const result = await announcementService.deleteAnnouncement(
      req.query.infoId
    );
    return [result, 0, "success"];
  })
);

router.get(
  "/getTitleAll",
  asyncHandler(async req => {
    const result = await announcementService.getTitleAll(
      req.query.page,
      req.query.limit
    );
    return [result, 0, "success"];
  })
);

router.post(
  "/getFile",
  upload.single("img"),
  asyncHandler(async req => {
    console.log(req.file);
    const url = `/images/${req.file.filename}`;
    return [url, 0, "success"];
  })
);

module.exports = router;
