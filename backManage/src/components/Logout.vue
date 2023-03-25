<template>
  <div>123123</div>
</template>

<script>
export default {
  name: "logout",
  created() {
    console.log(1);
    this.logout();
  },
  methods: {
    logout() {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("username");
      this.$message({
        message: "登出成功",
        type: "success",
        duration: 2000
      });
      this.$router.push({ path: "/admin/login" });
    }
  },
  watch: {
    $route: function(route) {
      if (route.name === "logout") {
        this.logout();
      }
    }
  }
};
</script>

<style></style>
