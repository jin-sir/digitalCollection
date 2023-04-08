// const BlogArticle = require("./BlogArticle");
// const Tag = require("./Tag");
// const Comment = require("./Comment");
// const Tag_Article_mapping = require("./Tag_Article_mapping");

// BlogArticle.hasMany(Comment);
// Comment.belongsTo(BlogArticle);

// BlogArticle.hasMany(Tag_Article_mapping);
// Tag_Article_mapping.belongsTo(BlogArticle);

// Tag.hasMany(Tag_Article_mapping);
// Tag_Article_mapping.belongsTo(Tag);

const User = require("./User")
const Realname = require("./Realname")
const Points = require("./Points")
const Collection_sell_manage = require("./Collection_sell_manage")
const Collection_holdings = require("./Collection_holdings")
const Collection_selling = require("./Collection_selling")
const Order_list = require("./Order_list")

User.hasOne(Realname, {
    sourceKey: 'uId',
    foreignKey: {
        name: 'uId',
        allowNull: false,
        unique: true
    }
})
Realname.belongsTo(User, {
    targetKey: 'uId',
    foreignKey: {
        name: 'uId',
        allowNull: false,
        unique: true
    }
})

User.hasOne(Points, {
    sourceKey: 'uId',
    foreignKey: {
        name: 'uId',
        allowNull: false,
        unique: true
    }
})
Points.belongsTo(User, {
    targetKey: 'uId',
    foreignKey: {
        name: 'uId',
        allowNull: false,
        unique: true
    }
})


Collection_sell_manage.hasMany(Collection_holdings, {
    sourceKey: 'cId',
    foreignKey: {
        name: 'cId',
        allowNull: false,
    }
})
Collection_holdings.belongsTo(Collection_sell_manage, {
    targetKey: 'cId',
    foreignKey: {
        name: 'cId',
        allowNull: false,
    }
})

User.hasMany(Collection_holdings, {
    sourceKey: 'uId',
    foreignKey: {
        name: 'uId',
        allowNull: false,
    }
})
Collection_holdings.belongsTo(User, {
    targetKey: 'uId',
    foreignKey: {
        name: 'uId',
        allowNull: false,
    }
})

Collection_sell_manage.hasMany(Collection_selling, {
    sourceKey: 'cId',
    foreignKey: {
        name: 'cId',
        allowNull: false,
    }
})
Collection_selling.belongsTo(Collection_sell_manage, {
    targetKey: 'cId',
    foreignKey: {
        name: 'cId',
        allowNull: false,
    }
})

User.hasMany(Collection_selling, {
    sourceKey: 'uId',
    foreignKey: {
        name: 'uId',
        allowNull: false,
    }
})
Collection_selling.belongsTo(User, {
    targetKey: 'uId',
    foreignKey: {
        name: 'uId',
        allowNull: false,
    }
})

Collection_selling.hasMany(Order_list)
Order_list.belongsTo(Collection_selling)

User.hasMany(Order_list, {
    sourceKey: 'uId',
    foreignKey: {
        name: 'uId',
        allowNull: false,
    }
})
Order_list.belongsTo(User, {
    targetKey: 'uId',
    foreignKey: {
        name: 'uId',
        allowNull: false,
    }
})