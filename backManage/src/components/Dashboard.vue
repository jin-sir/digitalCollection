<template>
  <div class="dashboard">
    <el-row>
      <el-col :span="24">
        <div class="info">
          <h1>网站概要</h1>
          <div>
            <router-link :to="{ name: 'articleCreate' }">
              <el-button type="success">撰写新文章</el-button>
            </router-link>
          </div>
        </div>
        <el-slider style="margin-top: 20px" v-model="sliderValue"></el-slider>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top:20px;">
      <el-col :span="10">
        <div class="recent">
          <el-tree
            :default-expand-all="true"
            style="border-width: 0px"
            :data="data"
            :props="defaultProps"
            @node-click="handleNodeClick"
          ></el-tree>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "info",
  data() {
    return {
      sliderValue: 100,
      data: [],
      defaultProps: {
        children: "children",
        label: "title"
      },
      list: []
    };
  },
  methods: {
    handleNodeClick(data) {
      if (data.title !== "最近发布的文章") {
        this.$router.push({
          name: data.type === "post" ? "postCreate" : "pageCreate",
          params: { id: data._id }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  padding: 20px;

  .info {
    height: 100px;
  }
}
</style>
