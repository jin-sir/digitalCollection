var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

smtpTransport = nodemailer.createTransport({
  service: "QQ",
  auth: {
    user: "1944584324@qq.com", //自己的QQ邮箱地址
    pass: "rjpgefruznnfbcgb", //使用自己的QQ邮箱申请一个，下边会有详细讲解
  },
});

/**
 * @param {String} recipient 收件人
 * @param {String} subject 发送的主题
 * @param {String} html 发送的html内容
 */
const sendMail = function (recipient, subject, html) {
  smtpTransport.sendMail(
    {
      from: "1944584324@qq.com",
      to: recipient,
      subject: subject,
      html: html,
    },
    function (error, response) {
      if (error) {
        console.log(error);
        return error
      }
      console.log(response, "发送成功");
    }
  );
};

module.exports = {
  sendMail,
};
