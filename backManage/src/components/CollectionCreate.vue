<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="藏品名" prop="swiperUrl">
      <el-input v-model="form.cName"></el-input>
    </el-form-item>
    <el-form-item label="发布者" prop="swiperUrl">
      <el-input v-model="form.auther"></el-input>
    </el-form-item>
    <el-form-item label="发售数量" prop="swiperUrl">
      <el-input type="number" v-model="form.circulation"></el-input>
    </el-form-item>
    <el-form-item label="发售价格" prop="swiperUrl">
      <el-input type="number" v-model="form.price"></el-input>
    </el-form-item>
    <el-form-item label="寄售限价" prop="swiperUrl">
      <el-input type="number" v-model="form.limit_price"></el-input>
    </el-form-item>
    <el-form-item label="图片路径" prop="swiperUrl">
      <el-input v-model="form.url"></el-input>
      <el-upload
        class="avatar-uploader"
        action="http://localhost:12306/api/admin/announcement/getFile"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        name="img"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="是否上架" prop="isUpdate">
      <el-switch
        v-model="form.isUpdate"
        active-color="#13ce66"
        inactive-color="#ff4949"
      >
      </el-switch>
    </el-form-item>
    <el-form-item label="是否开启寄售" prop="isBusiness">
      <el-switch
        v-model="form.isBusiness"
        active-color="#13ce66"
        inactive-color="#ff4949"
      >
      </el-switch>
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
    return {
      form: {
        url: "",
        circulation: 0,
        sumstock: 0,
        auther: "",
        price: 0,
        limit_price: 0,
        sellTime: new Date().getTime(),
        isUpdate: false,
        isBusiness: false,
        cName: "",
      },
      imageUrl: "",
      dialogVisible: false,
      disabled: false,
    };
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate(async valid => {
        if (valid) {
          const r = await axios.post(
            "/api/admin/sellProduct/addNewProduct",
            this.form
          );
          if (r.data.code === 0) {
            this.$message({
              message: "发布成功~~",
              type: "success",
            });
            this.$router.push({
              name: "collectionList",
            });
          }
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.form.url = res.data;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
::v-deep.avatar-uploader .el-upload {
  margin: 10px 0;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
