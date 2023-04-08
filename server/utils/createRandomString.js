const crypto = require("crypto");

const cId_dicts = new Map();
let cId_count = 0;
/**
 * 
 * @returns 
 */
function createUId() {
  cId_count++;
  // 获取5位有效随机整数
  const random = parseInt(Math.random().toString().substring(2), 10)
    .toString()
    .substring(0, 5);
  // 获取时间戳
  const now = Date.now();
  // 生成拼接数字字串
  let code = parseInt(
    random + now.toString().substring(4, 8) + cId_count.toString(),
    10
  )
    .toString()
    .substring(0, 10);
  // 如果重复, 递归直到不重复
  if (cId_dicts.has(code)) {
    code = createCId();
  }
  // 否则插入结果列表
  cId_dicts.set(code, true);
  // 返回结果
  return code;
}

/**
 * 生成随机字母和数字拼接字串
 * @param {*} param0.count 生成字串数量, 默认100个
 * @returns
 */
const invite_dicts = new Map();
let invite_count = 0;
function createInvite_code() {
  invite_count++
  // 获取5位有效随机整数
  const random = parseInt(Math.random().toString().substring(2), 10)
    .toString()
    .substring(0, 5);
  // 获取时间戳
  const now = Date.now();
  // 生成拼接数字字串
  let code = parseInt(
    random + now.toString().substring(4, 8) + invite_count.toString(),
    10
  )
    .toString(36)
    .toUpperCase()
    .substring(0, 6);
  // 如果重复, 递归直到不重复
  if (invite_dicts.has(code)) {
    code = createInvite_code();
  }
  // 否则插入结果列表
  invite_dicts.set(code, true);
  // 返回结果
  return code;
}

function createAddress(uId) {
  return "0x" + crypto.createHash("sha1").update(uId).digest("hex");
}

function createVeriCode() {
  // 获取5位有效随机整数
  const random = parseInt(Math.random().toString().substring(2), 10)
    .toString()
    .substring(0, 5);
  // 获取时间戳
  const now = Date.now();
  // 生成拼接数字字串
  let code = parseInt(random + now.toString().substring(4, 9), 10)
    .toString()
    .substring(0, 6);
  // 返回结果
  return code;
}

module.exports = {
  createUId,
  createInvite_code,
  createAddress,
  createVeriCode
}
