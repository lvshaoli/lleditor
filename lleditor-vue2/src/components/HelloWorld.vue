<template>
  <div class="hello">
    <button @click="myBtnClick">按钮</button>
    <LLEditor v-model="editorContent" :config="editorConfig" />
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      editorContent: "",
      editorConfig: {
        language: "zh-cn",
        uploadVideo: ({ file, success }) => {
          console.log('********************8', file, success);
          setTimeout(() => {
            success &&
              success({
                src:
                  "http://talatan.com:29111/image/v1/file/cache/download?key=video/test.mp4",
                name: "组件测试视频上传",
              });
          }, 5000);
        },
      },
    };
  },
  methods: {
    myBtnClick() {
      console.log("************", this.editorContent);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
