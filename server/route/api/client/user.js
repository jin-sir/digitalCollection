const userService = require("../../../service/userService");
const VeriCodeService = require("../../../service/VeriCodeService");
const realnameService = require("../../../service/realnameService");
const express = require("express");
const { asyncHandler } = require("../../getSendResult");
const router = express.Router();
const {
  createUId,
  createAddress,
  createInvite_code,
  createVeriCode,
} = require("../../../utils/createRandomString");
const { sendMail } = require("../../../utils/mail");
const jwt = require("../../jwt");

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const result = await userService.loginByPwd({
      account: req.body.account,
      pwd: req.body.pwd,
    });
    if (result) {
      const info = {
        uId: result.uId,
        account: result.account,
      };
      //登录成功
      jwt.publish(res, undefined, info);
      return [null, 0, "登录成功"];
    }
    return [result, 1, "账户或密码错误"];
  })
);

router.post(
  "/loginByCode",
  asyncHandler(async req => {
    const { veri_code, updatedAt } = await VeriCodeService.queryVeriCode(
      req.body.account
    );
    if (veri_code !== req.body.veri_code) {
      return [null, 1, "验证码错误"];
    } else {
      const now = Date.now();
      const MINUTE_5 = 300000;
      if (now - MINUTE_5 > updatedAt.getTime()) {
        return [null, 1, "验证码已过期"];
      }
    }
    const result = await userService.loginByVeriCode(req.body.account);
    if (result) {
      const info = {
        uId: result.uId,
        account: result.account,
      };
      //登录成功
      jwt.publish(res, undefined, info);
      return null;
    }
    return [result];
  })
);

router.post(
  "/resigter",
  asyncHandler(async req => {
    const codeObj = await VeriCodeService.queryVeriCode(req.body.account);
    if (codeObj === null) {
      return [null, 1, "账号与验证码不匹配"];
    }
    const { veri_code, updatedAt } = codeObj;
    if (veri_code !== req.body.veri_code) {
      return [null, 1, "验证码错误"];
    } else {
      const now = Date.now();
      const MINUTE_5 = 300000;
      if (now - MINUTE_5 > updatedAt.getTime()) {
        return [null, 1, "验证码已过期"];
      }
    }
    const uId = createUId();
    const address = createAddress(uId);
    const invite_code = createInvite_code();
    try {
      await userService.addUser({
        uId,
        nick: req.body.account.substring(req.body.account.length - 4),
        account: req.body.account,
        pwd: req.body.pwd,
        address,
        isSign: false,
        invite_code,
        higher_level: req.body.higher_level,
      });
      return [null, 0, "注册成功"];
    } catch (e) {
      return [null, 1, "用户已存在"];
    }
  })
);

router.get(
  "/getVeriCode",
  asyncHandler(async req => {
    const veri_code = createVeriCode();
    const template = {
      title: "麒麟数藏注册",
      html: `【麒麟数藏】${veri_code}(动态验证码),请在五分钟内填写`,
    };
    await VeriCodeService.refreshVeriCode(req.query.account, veri_code);
    sendMail(req.query.mail, template.title, template.html);
    return [null, 0, "获取成功"];
  })
);

router.post(
  "/realname",
  asyncHandler(async (req, res) => {
    console.log(req.uId)
    try {
      const result = await realnameService.addRealname({
        uId: req.uId,
        username: req.body.username,
        IDCard: req.body.IDCard,
      });
      if (result) {
        const a = await userService.updateSign(req.uId)
        console.log(a)
        return [null, 0, "实名成功"];
      }
    } catch (e) {
      return [null, 1, "已实名"];
    }
  })
);

module.exports = router;
