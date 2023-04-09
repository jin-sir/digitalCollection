<template>
  <div class="tag-list">
    <el-table
      :data="tagList"
      v-loading.body="isLoading"
      border
      style="width: 100%;min-width:980px"
    >
      <el-table-column prop="id" label="id" width="260"> </el-table-column>
      <el-table-column prop="tagname" label="标签" width="320">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="`http://localhost:12306${scope.row.url}`"
            fit="fit"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-switch
            :value="scope.row.isVisible"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="openVisible(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <span slot-scope="scope" class="btn-wrapper">
          <el-button @click="handleDelete(scope.row)" type="danger" size="small"
            >删除</el-button
          >
        </span>
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
      this.isLoading = true;
      axios.delete(`/api/admin/swiper/delSwiper?sid=${row.id}`).then(r => {
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
      const r = await axios.get("/api/admin/swiper/swiperlistAll");
      this.tagList = r.data.data;
      this.isLoading = false;
    },
    currentChange(cur) {
      const limit = 8;
      this.getArticle(cur, limit);
    },
    openVisible(row) {
      this.isLoading = true;
      axios
        .post("/api/admin/swiper/updateSwiperVisible", {
          sId: row.id,
          isVisible: !row.isVisible,
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
