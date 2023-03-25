<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="120px">
    <el-form-item label="标签名称" prop="tagname">
      <el-input v-model="form.tagname"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.native="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios";
export default {
  created() {
    if (this.$route.name === "tagEdit") {
      const tagId = this.$route.params.id;
      this.tagId = tagId;
      axios.get(`/api/tag/admin/${tagId}`).then(r => {
        console.log(r);
        this.form.tagname = r.data.data.tagname;
        this.form.oldtagname = r.data.data.tagname;
        // this.form.tag = JSON.parse(this.form.tag);
      });
    }
  },
  data() {
    const validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入标签"));
      } else {
        if (this.form.user !== "") {
          this.$refs.form.validateField("tag");
        }
        callback();
      }
    };
    return {
      form: {
        tagname: "",
        oldtagname: "",
        tagId: null
      },
      rules: {
        tagname: [{ validator: validateUser, trigger: "blur" }]
      },
      isLoading: true
    };
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.$route.name === "tagEdit") {
            this.updateTagname();
          } else {
            this.addTag();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async updateTagname() {
      const tagId = this.tagId;
      const r = await axios.put(`/api/tag/${tagId}`, this.form);
      console.log(r);
      if (r.data.code === 0) {
        this.$message({
          message: "修改成功~~",
          type: "success"
        });
        this.$router.push({
          name: "tagList"
        });
      }
    },
    async addTag() {
      const r = await axios.post("/api/tag", this.form);
      console.log(r);
      if (r.data.code === 0) {
        this.$message({
          message: "添加成功~~",
          type: "success"
        });
        this.$router.push({
          name: "tagList"
        });
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
