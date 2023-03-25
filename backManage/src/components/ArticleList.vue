<template>
  <div class="article-list">
    <el-table
      :data="articleList"
      v-loading.body="isLoading"
      border
      style="width: 100%;min-width:980px"
    >
      <el-table-column prop="id" label="id" width="260"> </el-table-column>
      <el-table-column prop="title" label="文章" width="260"> </el-table-column>
      <el-table-column prop="pathName" label="文章路径" width="260">
      </el-table-column>
      <el-table-column
        prop="tag"
        label="标签"
        width="180"
        :formatter="dealTag"
      ></el-table-column>
      <el-table-column label="操作">
        <span slot-scope="scope"  class="btn-wrapper">
          <el-button @click="handleClick(scope.row)" type="primary" size="small"
            >编辑</el-button
          >
          <el-button
            @click="handleDelete(scope.row, scope.$index)"
            type="danger"
            size="small"
            >删除</el-button
          >
        </span>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="8"
      :pager-count="5"
      layout="prev, pager, next"
      :total="total"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    this.getArticle(1, 8);
  },
  data() {
    return {
      tagAll: [],
      isLoading: false,
      articleList: [],
      total: 0
    };
  },
  methods: {
    handleClick(row) {
      this.$router.push({
        path: `/article/edit/${row.id}`
      });
    },
    handleDelete(row) {
      const id = row.id;
      axios
        .delete(`/api/blogArticle/${id}`)
        .then(r => {
          console.log(r);
          if (r.data.code === 0) {
            this.$message({
              message: "文章已删除成功",
              type: "success"
            });
            this.getArticle();
          }
        })
        .catch(err => {
          this.$message({
            message: err.response.data.msg,
            type: "error"
          });
          console.log(err.response);
        });
    },
    dealTag(row, column, cellValue) {
      return cellValue instanceof Array ? cellValue.join(",") : cellValue;
    },
    currentChange(cur) {
      const limit = 8;
      this.getArticle(cur, limit);
    },
    getArticle(page, limit) {
      axios.get("/api/blogArticle", { params: { page, limit } }).then(r => {
        this.articleList = r.data.data.datas.map(item => {
          item.tag = JSON.parse(item.tag);
          return item;
        });
        this.total = r.data.data.total;
      });
    }
  }
};
</script>

<style>
.article-list {
  padding: 40px;
}
.btn-wrapper {
  display: flex;
  justify-content: space-around;
}
</style>
