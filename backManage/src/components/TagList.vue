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
      </el-table-column>
      <el-table-column label="操作">
        <span slot-scope="scope" class="btn-wrapper">
          <el-button @click="handleClick(scope.row)" type="primary" size="small"
            >编辑</el-button
          >
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
      const r = await axios.get("/api/tag");
      this.tagList = r.data.data;
    },
    currentChange(cur) {
      const limit = 8;
      this.getArticle(cur, limit);
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
