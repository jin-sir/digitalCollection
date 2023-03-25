<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="120px">
    <el-form-item label="标题" prop="title">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="昵称" prop="username">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="职业" prop="profession">
      <el-input v-model="form.profession"></el-input>
    </el-form-item>
    <el-form-item label="个人介绍" prop="description">
      <el-input type="textarea" v-model="form.description"></el-input>
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
    const validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入昵称"));
      } else {
        if (this.form.username !== "") {
          callback();
        }
      }
    };
    const validateTitle = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入标题"));
      } else {
        if (this.form.pwd !== "") {
          callback();
        }
      }
    };
    const validateProfession = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入职业"));
      } else {
        if (this.form.username !== "") {
          callback();
        }
      }
    };
    const validateDescription = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入个人介绍"));
      } else {
        if (this.form.pwd !== "") {
          callback();
        }
      }
    };
    return {
      form: {
        title: "",
        username: "",
        profession: "",
        description: "",
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        title: [{ validator: validateTitle, trigger: "blur" }],
        profession: [{ validator: validateProfession, trigger: "blur" }],
        description: [{ validator: validateDescription, trigger: "blur" }],
      },
      isLoading: true,
    };
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.updateAdmin();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async updateAdmin() {
      const r = await axios.post("/api/info/addinfo", this.form);
      console.log(r);
      if (r.data.code === 0 && r.data.data) {
        this.$message({
          message: "个人信息修改成功",
          type: "success",
        });
      }
    },
  },
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
