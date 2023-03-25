<template>
  <el-form
    ref="form"
    v-loading.body="isLoading"
    :model="form"
    label-width="80px"
  >
    <el-row :gutter="0">
      <el-col :span="18">
        <el-form-item
          v-for="(item, index) in prevItems"
          :key="index"
          :label="item.label"
        >
          <el-input
            v-if="item.type === 'input'"
            :placeholder="item.description || ''"
            v-model="form[item.prop]"
          ></el-input>
          <markdown
            v-if="item.type === 'markdown'"
            v-model="form[item.prop]"
            :toc="form[item.subProp]"
            @change="form[item.subProp] = arguments[0]"
          ></markdown>
          <el-radio
            v-if="item.type === 'radio'"
            v-model="form[item.prop]"
            :label="item.label"
          ></el-radio>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label-width="20px">
          <el-button
            :class="{ 'margin-left': true }"
            type="primary"
            @click.native="onSaveToc"
            >生成目录
          </el-button>
          <el-button type="success" @click.native="onSubmit"
            >提交文章
          </el-button>
        </el-form-item>
        <el-form-item
          v-for="(item, index) in nextItems"
          :key="index"
          :label="item.label"
        >
          <markdown
            v-if="item.type === 'markdown'"
            v-model="form[item.prop]"
          ></markdown>

          <el-date-picker
            v-if="item.type === 'date-picker'"
            type="datetime"
            v-model="form[item.prop]"
            placeholder="选择日期时间"
          >
          </el-date-picker>

          <el-select
            v-if="item.type === 'select'"
            v-model="form[item.prop]"
            multiple
          >
            <el-option
              v-for="(tag, index) in tags"
              :key="index"
              :label="tag.tagname"
              :value="tag.tagname"
            >
            </el-option>
          </el-select>

          <el-select v-if="item.type === 'radio'" v-model="form[item.prop]">
            <el-option
              v-for="(cate, index) in cates"
              :key="index"
              :label="cate"
              :value="cate"
            >
            </el-option>
          </el-select>

          <el-switch
            v-if="item.type === 'switch'"
            v-model="form[item.prop]"
          ></el-switch>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import Markdown from "./markdown.vue";
import { marked, toc } from "@/utils/marked";
import axios from "axios";
export default {
  created() {
    const items = [
      {
        prop: "title",
        label: "标题",
        type: "input",
        default: "",
        width: 250
      },
      {
        prop: "pathName",
        label: "路径",
        type: "input",
        default: "",
        width: 250,
        description: "作为文章的唯一标志在前端路径中显示，例如test-article"
      },
      {
        prop: "markdownContent",
        label: "内容",
        type: "markdown",
        default: "",
        width: 170,
        subProp: "markdownToc"
      },
      {
        type: "split"
      },
      {
        prop: "tag",
        label: "标签",
        type: "select",
        default: [],
        width: 170
      },
      {
        prop: "isPublic",
        label: "是否公开",
        type: "switch",
        default: true,
        width: 170
      },
      {
        prop: "allowComment",
        label: "允许评论",
        type: "switch",
        default: true,
        width: 170
      }
    ];
    this.items = items;
    axios.get("/api/tag").then(r => {
      this.tags = r.data.data;
    });
    if (this.$route.name === "articleEdit") {
      axios.get(`/api/blogArticle/admin/${this.$route.params.id}`).then(r => {
        console.log(r);
        this.form = r.data.data;
        this.form.tag = JSON.parse(this.form.tag);
      });
    } else {
      let form = items.reduce((prev, curr) => {
        curr.prop &&
          (prev[curr.prop] = Array.isArray(curr.default)
            ? curr.default.map(value => value)
            : curr.default);
        return prev;
      }, {});
      form.markdownToc = "";
      this.form = form;
    }
  },
  data() {
    return {
      form: {},
      items: [],
      isLoading: false,
      tags: []
    };
  },
  components: {
    Markdown
  },
  computed: {
    splitIndex() {
      return this.items.reduce((prev, curr, index) => {
        if (curr.type === "split") {
          return index;
        }
        return prev;
      }, -1);
    },
    prevItems() {
      return this.items.slice(0, this.splitIndex);
    },
    nextItems() {
      return this.items.slice(this.splitIndex);
    }
  },
  methods: {
    restore(key, val) {
      this.$confirm("", "发现草稿，是否恢复?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false
      })
        .then(() => {
          this.form.markdownContent = val;
          this.$message({
            type: "success",
            message: "已恢复草稿"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消恢复，提交文章后将清理草稿"
          });
        });
    },
    saveLS(key, value) {
      window.localStorage.setItem(key, value);
    },
    getLS(key) {
      return window.localStorage.getItem(key);
    },
    onSaveToc() {
      toc.length = 0;
      marked(this.form.markdownContent);
      let tocMarkdown = this.tocToTree(toc);
      this.form.markdownToc = "**文章目录**\n" + tocMarkdown;
    },
    tocToTree(toc) {
      return toc
        .map(item => {
          let times = (item.level - 1) * 2;
          return `${" ".repeat(times)} - [${item.title}](#${item.slug})`;
        })
        .join("\n");
    },
    validate() {
      this.form.summary = marked(
        this.form.markdownContent.split("<!--more-->")[0]
      );
      this.form.content = marked(
        this.form.markdownContent
          .substring(this.form.markdownContent.indexOf("<!--more-->"))
          .replace(/<!--more-->/g, "")
      );
      if (
        !this.form.markdownToc ||
        this.form.markdownToc === "**文章目录**\n"
      ) {
        this.onSaveToc();
      }
      this.form.markdownToc = this.form.markdownToc || "";
      this.form.toc = marked(this.form.markdownToc);
    },
    onSubmit() {
      this.validate();
      if (this.$route.name === "articleEdit") {
        const id = this.$route.params.id;
        axios
          .put(`/api/blogArticle/${id}`, this.form)
          .then(r => {
            console.log(r);
            if (r.data.code === 0) {
              this.$message({
                message: "文章已修改成功",
                type: "success"
              });
              this.$router.push({
                name: "articleList"
              });
            }
          })
          .catch(err => {
            this.$message({
              message: err.response.data.msg,
              type: "error"
            });
            console.log(err.response);
          });
      } else {
        axios
          .post("/api/blogArticle", this.form)
          .then(r => {
            console.log(r);
            if (r.data.code === 0) {
              this.$message({
                message: "文章已成功提交",
                type: "success"
              });
              this.$router.push({
                name: "articleList"
              });
            }
          })
          .catch(err => {
            this.$message({
              message: err.response.data.msg,
              type: "error"
            });
            console.log(err.response);
          });
      }

      //   this.$store
      //     .dispatch("POST", {
      //       model: this.options.model,
      //       form: this.form,
      //     })
      //     .then((response) => {
      //       const url = this.$store.state.siteInfo.siteUrl.value;
      //       const path = this.form.pathName;
      //       const timestamp = new Date(this.form.updatedAt).valueOf();
      //       const key = `${url}|${path}`;
      //       this.saveLS(key, this.form.markdownContent + `|${timestamp}`);

      //       if (response._id && this.id === -1) {
      //         this.$router.replace({ params: { id: response._id } });
      //         this.form = response;
      //         this.id = response._id;
      //       }
      //     })
      //     .catch((err) => console.error(err));
    },
    handleAddTag(tag) {
      this.form.tag.indexOf(tag) === -1 && this.form.tag.push(tag);
    },
    handleDelete(index) {
      this.form.tag.splice(index, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.margin-left {
  margin-left: 10px;
}

.el-select {
  margin-right: 5px;
}

.el-form {
  margin-top: 20px;
}
</style>
