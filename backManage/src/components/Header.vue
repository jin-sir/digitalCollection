<template>
  <div class="top">
    <el-row class="tac">
      <el-col :span="6">
        <div class="logo">个人博客后台管理系统</div>
      </el-col>
      <el-col :span="18">
        <el-menu
          default-active="1"
          mode="horizontal"
          class="el-menu-vertical-demo"
          :unique-opened="true"
          background-color="#324157"
          text-color="#bfcbd9"
          active-text-color="#bfcbd9"
          @select="handleSelect"
        >
          <el-submenu index="1">
            <template slot="title">{{
              displayName === -1 ? "未登录" : displayName
            }}</template>
            <el-menu-item index="1-1">修改密码</el-menu-item>
            <el-menu-item index="1-2">退出</el-menu-item>
          </el-submenu>
          <div class="avator">
            <img src="@/assets/avator.jpg" alt="头像" />
          </div>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  computed: {
    displayName() {
      return this.$store.state.user.displayName || -1;
    },
  },
  methods: {
    handleSelect(index) {
      if (index === "1-1") {
        this.$router.push({
          name: "userEdit",
        });
      } else if (index === "1-2") {
        this.$router.push({
          name: "logout",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {
  padding-left: 20px;
  font-size: 20px;
  color: #fff;
  background-color: #324157;
  line-height: 60px;
}
.avator {
  height: 60px;
  float: right;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    padding: 10px 0;
  }
}
.el-breadcrumb {
  position: relative;
  left: 20px;
  float: left;
  z-index: 1;
  line-height: 60px;
  font-size: 14px;
}

li.el-submenu {
  float: right;
}

.el-menu > .el-submenu.is-opened::v-deep .el-submenu__title {
  border-bottom: 5px solid #20a0ff !important;
}
.el-menu > .el-submenu::v-deep .el-submenu__title {
  background-color: #324157 !important;
  color: #bfcbd9 !important;
}
</style>
