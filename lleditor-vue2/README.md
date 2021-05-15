# 安装 
```
npm install lleditor-vue2
```
# 使用
```
import LLEditor from "lleditor-vue2";

Vue.use(LLEditor);
```

# html
```
    <button @click="myBtnClick">获取值</button>
    <LLEditor v-model="editorContent" :config="editorConfig" />
```

# data
```
 data() {
    return {
      editorContent: "", // 编辑器内容
      editorConfig: {  // 编辑器config 默认已有配置,可根据ckeditor重新配置 
        language: "zh-cn",
        uploadVideo: ({ file, success }) => { // 选择了视频的回调, file: 选择的视频文件, success上传成功后,告诉编辑器插入视频
          console.log('file, success);
          setTimeout(() => {
            success &&
              success({ // 需要携带视频链接
                src:
                  "http://xxx.xxxx.xxx/image/v1/file/cache/download?key=video/test.mp4",
                name: "组件测试视频上传",
              });
          }, 5000);
        },
      },
    };
  }
```

# 获取编辑器内容
```
  methods: {
    myBtnClick() {
      console.log("编辑器内容", this.editorContent);
    },
  },
```