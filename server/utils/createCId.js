/**
 * 生成随机字母和数字拼接字串
 * @param {*} param0.count 生成字串数量, 默认100个
 * @returns
 */
const dicts = new Map()
let count = 0;
function createRandomString() {
    count++;
    // 获取5位有效随机整数
    const random = parseInt(Math.random().toString().substring(2), 10)
      .toString()
      .substring(0, 5);
    // 获取时间戳
    const now = Date.now();
    // 生成拼接数字字串
    let code = parseInt(random + now.toString() + count.toString(), 10)
      .toString(36)
      .toUpperCase()
      .substring(0,10);
    // 如果重复, 递归直到不重复
    if (dicts.has(code)) {
        code = createRandomString()
    }
    // 否则插入结果列表
    dicts.set(code, true)
  // 返回结果
  return code;
}

module.exports.createCId = createRandomString
