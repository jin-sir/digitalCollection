<template>
  <div class="tag-list">
    <el-table
      :data="tagList"
      v-loading.body="isLoading"
      border
      style="width: 100%;min-width:980px"
    >
      <el-table-column prop="id" label="id" width="260"> </el-table-column>
      <el-table-column prop="cName" label="藏品名" width="260">
      </el-table-column>
      <el-table-column prop="tagname" label="图片" width="120">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="`http://localhost:12306${scope.row.url}`"
            fit="fit"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="修改限价">
        <template slot-scope="scope">
          <el-input type="number" v-model="scope.row.limit_price"></el-input>
          <el-button type="primary" @click="updateLimitPrice(scope.row)"
            >提交</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="是否上架">
        <template slot-scope="scope">
          <el-switch
            :value="scope.row.isUpdate"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="openUpdate(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="是否开启寄售">
        <template slot-scope="scope">
          <el-switch
            :value="scope.row.isBusiness"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="openBusiness(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    this.getTags();
  },
  data() {
    return {
      tagAll: [],
      isLoading: false,
      tagList: [],
      isVisible: false,
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
      this.$router.push({
        path: `/tag/edit/${row.id}`,
      });
    },
    handleDelete(row) {
      axios.delete(`/api/tag/${row.id}`).then(r => {
        if (r.data.code === 0 && r.data.data) {
          this.getTags();
          this.$message({
            message: "删除成功~~",
            type: "success",
          });
        } else {
          this.$message({
            message: "删除失败~~，该标签有绑定文章无法删除",
            type: "error",
          });
        }
      });
    },
    async getTags() {
      const r = await axios.get("/api/admin/sellProduct/getNewProductAll");
      this.tagList = r.data.data;
      this.isLoading = false;
    },
    currentChange(cur) {
      const limit = 8;
      this.getArticle(cur, limit);
    },
    openUpdate(row) {
      this.isLoading = true;
      axios
        .post("/api/admin/sellProduct/openIsUpdate", {
          cId: row.cId,
          isUpdate: !row.isUpdate,
        })
        .then(res => {
          if (res.data.code === 0) {
            this.getTags();
          }
        });
    },
    openBusiness(row) {
      this.isLoading = true;
      axios
        .post("/api/admin/sellProduct/openBusiness", {
          cId: row.cId,
          isBusiness: !row.isBusiness,
        })
        .then(res => {
          if (res.data.code === 0) {
            this.getTags();
          }
        });
    },
    updateLimitPrice(row) {
      console.log(row);

      this.isLoading = true;
      axios
        .post("/api/admin/sellProduct/updateLimitPrice", {
          cId: row.cId,
          limit_price: +row.limit_price,
        })
        .then(res => {
          if (res.data.code === 0) {
            this.getTags();
          }
        });
    },
  },
};
</script>

<style>
.tag-list {
  padding: 40px;
}
.btn-wrapper {
  display: flex;
  justify-content: space-around;
}
</style>
