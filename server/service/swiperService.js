const Swiper = require("../model/Swiper");

/**
 * 添加轮播图
 * @param {*} swiperObj
 * @returns
 */
exports.addSwiper = async function (swiperObj) {
  const result = await Swiper.create(swiperObj);
  if (result) {
    return result.toJSON();
  }
  return result;
};

/**
 * 获取所有轮播图信息
 * @returns
 */
exports.querySwiperAll = async function () {
  const result = await Swiper.findAll();
  return result;
};

/**
 * 获取显示的轮播图
 * @returns
 */
exports.querySwiperByVisible = async function () {
  const result = await Swiper.findAll({
    where: {
      isVisible: true,
    },
  });
  return result;
};

/**
 * 控制轮播图的显示隐藏
 * @param {*} id
 * @param {*} isVisible
 * @returns
 */
exports.updateSwiperVisible = async function (id, isVisible) {
  console.log(id, isVisible)
  const result = await Swiper.update(
    { isVisible },
    {
      where: {
        id,
      },
    }
  );
  console.log(result)
  return result;
};

/**
 * 控制轮播图的显示隐藏
 * @param {*} id
 * @param {*} isVisible
 * @returns
 */
exports.delSwiper = async function (id) {
  const result = await Swiper.destroy({
    where: {
      id,
    },
  });
  return result;
};
