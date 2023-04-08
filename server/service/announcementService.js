const Announcement = require("../model/Announcement");
const { Op } = require("sequelize");

exports.addAnnouncement = async function (AnnouncementObj) {
  const result = await Announcement.create(AnnouncementObj);
  if (result) {
    return result.toJSON();
  }
  return result;
};

exports.updateAnnouncement = async function (id, articleObj) {
  return await Announcement.update(articleObj, {
    where: {
      id,
    },
  });
};

exports.deleteAnnouncement = async function (id) {
  return await Announcement.destroy({
    where: {
      id,
    },
  });
};

exports.getTitle = async function (page = 1, limit = 5) {
  const result = await Announcement.findAll({
    attributes: { exclude: ["content"] },
    offset: (page - 1) * limit,
    limit: +limit,
    order: [["createdAt", "DESC"]],
  });
  return result;
};

/**
 * 根据搜索获取文章
 * @param {*} wd
 * @param {*} page
 * @param {*} limit
 */
exports.getAnnouncementBySearch = async function (wd, page, limit) {
  const result = await Announcement.findAndCountAll({
    offset: (page - 1) * limit,
    limit: +limit,
    where: {
      [Op.or]: [
        {
          title: {
            [Op.like]: `%${wd}%`,
          },
        },
        {
          content: {
            [Op.like]: `%${wd}%`,
          },
        },
      ],
    },
    order: [["createdAt", "DESC"]],
  });
  return {
    total: result.count,
    datas: JSON.parse(JSON.stringify(result.rows)),
  };
};
exports.getAnnouncementByPage = async function (page, limit) {
  const result = await Announcement.findAll({
    offset: (page - 1) * limit,
    limit: +limit,
    order: [["createdAt", "DESC"]],
  });
  return {
    total: result.count,
    datas: JSON.parse(JSON.stringify(result.rows)),
  };
};

/**
 * 通过id获取某篇文章内容 √
 * @param {String} pathName
 */
exports.getAnnouncementById = async function (id) {
  let result = await Announcement.findOne({
    where: {
      id,
    },
  });
  if (result) {
    result = result.toJSON();
    return result;
  }
  return result;
};
