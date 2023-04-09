<template>
  <div class="login">
    <el-row type="flex" class="row-bg" justify="center" align="middle">
      <el-col :span="6">
        <div class="grid-content bg-purple-light">
          <el-form
            label-position="right"
            ref="form"
            :model="form"
            label-width="40px"
          >
            <p class="align-center" label-width="0">{{ title }}</p>
            <el-form-item label="账号">
              <el-input auto-complete="on" v-model="form.account"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input
                type="password"
                auto-complete="on"
                v-model="form.pwd"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">登陆</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
export default {
  name: "login",
  data() {
    return {
      title: "",
      form: {
        account: "",
        pwd: "",
      },
    };
  },
  methods: {
    async onSubmit() {
      const r = await axios.post("/api/admin/login", this.form);
      console.log(r);
      if (r.data.data) {
        this.isLogin(r.data.data);
        window.localStorage.setItem("token", r.data.data.pwd);
        window.localStorage.setItem("username", "admin");
        this.$router.push({
          path: "/",
        });
      } else {
        this.$message({
          type: "error",
          message: "用户名或密码错误~~",
        });
      }
    },
    ...mapMutations(["isLogin"]),
  },
  mounted() {
    // this.$store.dispatch('FETCH_OPTIONS').then(() => {
    //   this.title = this.$store.state.siteInfo['title'].value || ''
    // })
  },
};
</script>

<style lang="scss" scoped>
.login {
  height: 100%;

  .align-center {
    font-size: 30px;
    text-align: center;
  }

  .el-button--primary {
    width: 100%;
  }

  .row-bg {
    height: 100%;
  }
}
</style>
