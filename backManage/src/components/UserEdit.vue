<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="120px">
    <el-form-item label="账号" prop="username">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pwd">
      <el-input v-model="form.pwd"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.native="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios";
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        if (this.form.username !== "") {
          callback();
        }
      }
    };
    var validatePwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.pwd !== "") {
          callback();
        }
      }
    };
    return {
      form: {
        username: "",
        pwd: ""
      },
      rules: {
        username: [{ validator: validateUser, trigger: "blur" }],
        pwd: [{ validator: validatePwd, trigger: "blur" }]
      },
      isLoading: true
    };
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          // alert("submit!");
          this.updateAdmin();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async updateAdmin() {
      const r = await axios.put("/api/login", this.form);
      console.log(r);
      if (r.data.data && r.data.data[0]) {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("username");
        this.$message({
          message: "密码修改成功",
          type: "success"
        });
        this.$router.push({ path: "/admin/login" });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form {
  width: 40%;
  margin-top: 20px;

  .el-button {
    width: 100%;
  }
}
</style>
