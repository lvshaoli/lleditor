/*
 * @Author: your name
 * @Date: 2021-05-11 10:23:14
 * @LastEditTime: 2021-05-14 15:11:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RGEditor\examples\index.js
 */
import MyEditor from "../packages/my-editor/src/index";
// import MyEditor from "../packages/my-editor/dist/my-editor.min";

const myEditor = new MyEditor({uploadVideo: ({ file, success }) => {
    setTimeout(() => {
      success && success({ src:'http://talatan.com:29111/image/v1/file/cache/download?key=video/test.mp4', name: "测试视频上传" });
    }, 5000);
}});

function _bind($editor) {
    const submitBtn = document.getElementById("submit");
    submitBtn.onclick = function () {
      const val = $editor.editor && $editor.editor.getData();
      console.log("editorGetValue", val);
    };
  };

  _bind(myEditor);