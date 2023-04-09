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
          <quill-editor
            v-if="item.type === 'markdown'"
            class="ql-editor"
            v-model="content"
            ref="myQuillEditor"
            :options="editorOption"
            @change="onEditorChange($event)"
          >
          </quill-editor>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label-width="20px">
          <el-button type="success" @click.native="onSubmit"
            >发布公告
          </el-button>
        </el-form-item>
        <el-form-item
          v-for="(item, index) in nextItems"
          :key="index"
          :label="item.label"
        >
          <el-select v-if="item.type === 'select'" v-model="form[item.prop]">
            <el-option
              v-for="(tag, index) in tags"
              :key="index"
              :label="tag.tagname"
              :value="tag.tagname"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
// import Markdown from "./markdown.vue";
import axios from "axios";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import Quill from "quill"; // 引入编辑器
// 自定义字体大小
const Size = Quill.import("attributors/style/size");
Size.whitelist = ["10px", "12px", "16px", "18px", "20px", "30px", "32px"];
Quill.register(Size, true);

// 自定义字体类型
var fonts = [
  "SimSun",
  "SimHei",
  "Microsoft-YaHei",
  "KaiTi",
  "FangSong",
  "Arial",
  "sans-serif",
];
var Font = Quill.import("formats/font");
Font.whitelist = fonts;
Quill.register(Font, true);
export default {
  created() {
    const items = [
      {
        prop: "title",
        label: "标题",
        type: "input",
        default: "",
        width: 250,
      },
      {
        prop: "markdownContent",
        label: "内容",
        type: "markdown",
        default: "",
        width: 170,
        subProp: "markdownToc",
      },
      {
        type: "split",
      },
      {
        prop: "tag",
        label: "标签",
        type: "select",
        default: [],
        width: 170,
      },
    ];
    this.items = items;
    if (this.$route.name === "articleEdit") {
      const id = this.$route.params.id;
      axios
        .get(`/api/client/announcement/getAnnouncementDetail?infoId=${id}`)
        .then(r => {
          console.log(r);
          this.form.tag = r.data.data.tag;
          this.form.title = r.data.data.title;
          this.content = r.data.data.content;
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
      form: {
        tag: '',
        title: ''
      },
      items: [],
      isLoading: false,
      content: "",
      tags: [
        { tagname: "活动公告" },
        { tagname: "寄售公告" },
        { tagname: "合成公告" },
      ],
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
            ["blockquote", "code-block"], // 引用  代码块
            [{ header: 1 }, { header: 2 }], // 1、2 级标题
            [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
            [{ script: "sub" }, { script: "super" }], // 上标/下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            [{ direction: "rtl" }], // 文本方向
            [{ size: ["12px", false, "16px", "18px", "20px", "30px"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            [
              {
                font: [
                  false,
                  "SimSun",
                  "SimHei",
                  "Microsoft-YaHei",
                  "KaiTi",
                  "FangSong",
                  "Arial",
                ],
              },
            ], // 字体种类
            [{ align: [] }], // 对齐方式
            ["clean"], // 清除文本格式
            ["link", "image", "video"], // 链接、图片、视频
          ],
        },
        placeholder: "请输入正文",
      },
    };
  },
  components: {
    // Markdown,
    quillEditor,
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
    },
  },
  methods: {
    onSubmit() {
      if (this.$route.name === "articleEdit") {
        const id = this.$route.params.id;
        axios
          .post(`/api/admin/announcement/updateAnnouncement?infoId=${id}`, {
            tag: this.form.tag,
            title: this.form.title,
            content: this.content,
          })
          .then(r => {
            console.log(r);
            if (r.data.code === 0) {
              this.$message({
                message: "文章已修改成功",
                type: "success",
              });
              this.$router.push({
                name: "articleList",
              });
            }
          })
          .catch(err => {
            this.$message({
              message: err.response.data.msg,
              type: "error",
            });
            console.log(err.response);
          });
      } else {
        axios
          .post("/api/admin/announcement/addAnnouncement", {
            tag: this.form.tag,
            title: this.form.title,
            content: this.content,
          })
          .then(r => {
            console.log(r);
            if (r.data.code === 0) {
              this.$message({
                message: "文章已成功提交",
                type: "success",
              });
              this.$router.push({
                name: "articleList",
              });
            }
          })
          .catch(err => {
            this.$message({
              message: err.response.data.msg,
              type: "error",
            });
            console.log(err.response);
          });
      }
    },
    // 内容改变事件
    onEditorChange({ html }) {
      this.content = html;
    },
  },
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
// 给文本内容加高度，滚动条
.quill-editor ::v-deep .ql-container {
  min-height: 220px;
}

.ql-container {
  min-height: 230px;
}

::v-deep {
  .ql-snow .ql-tooltip [data-mode="link"]::before {
    content: "请输入链接地址:";
    left: 0;
  }

  .ql-snow .ql-tooltip.ql-editing {
    left: 0 !important;
  }

  .ql-snow .ql-tooltip {
    left: 0 !important;
  }

  .ql-snow .ql-editor {
    max-height: 300px;
  }

  .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: "保存";
    padding-right: 0px;
  }

  .ql-snow .ql-tooltip[data-mode="video"]::before {
    content: "请输入视频地址:";
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: "14px" !important;
    font-size: 14px;
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="10px"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="10px"]::before {
    content: "10px" !important;
    font-size: 10px;
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="12px"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="12px"]::before {
    content: "12px" !important;
    font-size: 12px;
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="16px"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="16px"]::before {
    content: "16px" !important;
    font-size: 16px;
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="18px"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="18px"]::before {
    content: "18px" !important;
    font-size: 18px;
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="20px"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="20px"]::before {
    content: "20px" !important;
    font-size: 20px;
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="30px"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="30px"]::before {
    content: "30px" !important;
    font-size: 30px;
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="32px"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="32px"]::before {
    content: "32px" !important;
    font-size: 32px;
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: "文本" !important;
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    content: "标题1" !important;
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    content: "标题2" !important;
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    content: "标题3" !important;
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    content: "标题4" !important;
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    content: "标题5" !important;
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    content: "标题6" !important;
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: "标准字体" !important;
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
    content: "衬线字体" !important;
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
    content: "等宽字体" !important;
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="SimSun"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="SimSun"]::before {
    content: "宋体" !important;
    font-family: "SimSun";
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="SimHei"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="SimHei"]::before {
    content: "黑体" !important;
    font-family: "SimHei";
  }

  .ql-snow
    .ql-picker.ql-font
    .ql-picker-label[data-value="Microsoft-YaHei"]::before,
  .ql-snow
    .ql-picker.ql-font
    .ql-picker-item[data-value="Microsoft-YaHei"]::before {
    content: "微软雅黑" !important;
    font-family: "Microsoft YaHei";
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="KaiTi"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="KaiTi"]::before {
    content: "楷体" !important;
    font-family: "KaiTi";
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="FangSong"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="FangSong"]::before {
    content: "仿宋" !important;
    font-family: "FangSong";
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="Arial"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="Arial"]::before {
    content: "Arial" !important;
    font-family: "Arial";
  }

  .ql-snow
    .ql-picker.ql-font
    .ql-picker-label[data-value="Times-New-Roman"]::before,
  .ql-snow
    .ql-picker.ql-font
    .ql-picker-item[data-value="Times-New-Roman"]::before {
    content: "Times New Roman" !important;
    font-family: "Times New Roman";
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="sans-serif"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="sans-serif"]::before {
    content: "sans-serif" !important;
    font-family: "sans-serif";
  }

  .ql-font-SimSun {
    font-family: "SimSun";
  }

  .ql-font-SimHei {
    font-family: "SimHei";
  }

  .ql-font-Microsoft-YaHei {
    font-family: "Microsoft YaHei";
  }

  .ql-font-KaiTi {
    font-family: "KaiTi";
  }

  .ql-font-FangSong {
    font-family: "FangSong";
  }

  .ql-font-Arial {
    font-family: "Arial";
  }

  .ql-font-Times-New-Roman {
    font-family: "Times New Roman";
  }

  .ql-font-sans-serif {
    font-family: "sans-serif";
  }

  .ql-snow.ql-toolbar .ql-formats .ql-revoke {
    width: 20px;
    height: 20px;
    filter: grayscale(100%);
    opacity: 1;
  }

  .ql-snow.ql-toolbar .ql-formats .ql-revoke:hover {
    width: 20px;
    height: 20px;
    filter: none;
    opacity: 0.9;
  }

  img {
    filter: grayscale(100%);
    opacity: 1;
  }

  img:hover {
    filter: none;
    opacity: 0.9;
  }

  /*加上height和滚动属性就可以，滚动条样式是系统默认样式，可能不同*/
  .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options {
    border-color: #ccc;
    height: 125px;
    overflow: auto;
  }
}
</style>
