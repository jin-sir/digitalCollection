<template>
  <el-row class="sidebar">
    <el-col :span="4" class="full-height" style="overflow-y:auto;">
      <el-menu
        :router="true"
        :default-active="fullPath"
        class="full-height"
        :unique-opened="true"
        @select="handleSelect"
      >
        <el-menu-item index="/dashboard"
          ><i class="el-icon-date"></i>概述</el-menu-item
        >

        <el-submenu index="2">
          <template slot="title"
            ><i class="el-icon-document"></i>文章管理</template
          >
          <el-menu-item index="/article/list">文章列表</el-menu-item>
          <el-menu-item index="/article/create">添加文章</el-menu-item>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title"
            ><i class="el-icon-star-off"></i>标签管理</template
          >
          <el-menu-item index="/tag/list">标签列表</el-menu-item>
          <el-menu-item index="/tag/create">添加标签</el-menu-item>
        </el-submenu>
        <el-menu-item index="/user/info"
          ><i class="el-icon-info"></i>个人信息</el-menu-item
        >

        <el-menu-item index="/user/edit"
          ><i class="el-icon-user"></i>用户设置</el-menu-item
        >
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      fullPath: "",
    };
  },
  methods: {
    handleSelect() {},
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  height: 100%;
  box-sizing: border-box;
  padding-bottom: 60px;

  .row-bg {
    height: 100%;
  }
}

.full-height {
  height: 100%;
  width: 148px;
}
.el-menu {
  border-radius: 2px;
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
  background-color: #eef1f6;
}
.el-submenu::v-deep .el-submenu__title:hover,
.el-menu-item:hover {
  background-color: #d1dbe5;
}
</style>
