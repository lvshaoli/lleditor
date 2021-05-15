##### 自己扩充ckEditor5插件，视频上传，和pdf上传

# 安装
```
npm install ll-editor/yarn add ll-editor
```
# 使用
```
<div id="editor" />

```
```
const myEditor = new MyEditor(
    {
        id: 'editor',
        ready: (editor) => {}, // 编辑器加载完毕
        disabled: false,  // 是否禁用
        editorConfig: {  // ckedior5相关配置
  language: "zh-cn",
        uploadVideo: ({ file, success }) => {
          console.log(file, success);
          setTimeout(() => {
            success &&
              success({
                src:
                  "http://xxx.xxx.xxx/image/v1/file/cache/download?key=video/test.mp4",
                name: "组件测试视频上传",
              });
          }, 5000);
        },
    }
);

```

```
获取编辑器内容
function _bind($editor) {
    const submitBtn = document.getElementById("submit");
    submitBtn.onclick = function () {
      const val = $editor.editor && $editor.editor.getData();
      console.log("editorGetValue", val);
    };
  };

  _bind(myEditor);
```