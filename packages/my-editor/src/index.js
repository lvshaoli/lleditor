/*
 * @Author: your name
 * @Date: 2021-05-11 10:57:53
 * @LastEditTime: 2021-05-14 17:31:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RGEditor\packages\my-editor\src\index.js
 */

import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import CKEditorInspector from "@ckeditor/ckeditor5-inspector";
// import Bold from "@plugin/plugin-bold/main";
// import Link from "@plugin/plugin-href/main";
import Video from "@plugin/plugin-video/main";
import PDF from "@plugin/plugin-pdf/main";
import eventObsever from "@plugin/utils/Observer";

import UploadAdapter from "@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter";
import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import CKFinder from "@ckeditor/ckeditor5-ckfinder/src/ckfinder";
import EasyImage from "@ckeditor/ckeditor5-easy-image/src/easyimage";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
import Indent from "@ckeditor/ckeditor5-indent/src/indent";
import Link from "@ckeditor/ckeditor5-link/src/link";
import List from "@ckeditor/ckeditor5-list/src/list";
// import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed";
import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice";
import Table from "@ckeditor/ckeditor5-table/src/table";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar";
import TextTransformation from "@ckeditor/ckeditor5-typing/src/texttransformation";
import CloudServices from "@ckeditor/ckeditor5-cloud-services/src/cloudservices";

export default class MyEditor {
  constructor(props) {
    Object.assign(
      this,
      {
        id: props.id || "editor",
        el: null,
        // uploadVideo: props.uploadVideo,
        ready: props.ready || null,
        disabled: props.disabled || false,
        editorConfig: props.editorConfig || {}
      },
      props
    );
    
    this.render();
    this.listenUpload();
  }

  listenUpload() {
    const { uploadVideo } = this.editorConfig || {};
    console.log('*&&&&&&&&&&&&&&&&&&&&&7', uploadVideo);
    eventObsever.$on("videoUpload", (e) => {
      uploadVideo &&
        uploadVideo({
          file: e,
          success: (videoConfig) => {
            eventObsever.$emit("videoInsert", videoConfig);
          },
        });
    });
  }

  render() {
    this.renderEditor = ClassicEditor.create((this.el || document.querySelector(`#${this.id}`)), {
      plugins: [
        Essentials,
        Paragraph,
        Bold,
        Link,
        Video,
        PDF,
        UploadAdapter,
        Autoformat,
        Italic,
        BlockQuote,
        CKFinder,
        CloudServices,
        EasyImage,
        Heading,
        Image,
        ImageCaption,
        ImageStyle,
        ImageToolbar,
        ImageUpload,
        Indent,
        Link,
        List,
        // MediaEmbed,
        PasteFromOffice,
        Table,
        TableToolbar,
        TextTransformation,
      ],
      toolbar: [
        // Bold.pluginName,
        // "|",
        // Link.pluginName,
        "heading",
        "|",
        "bold",
        "italic",
        "link",
        "bulletedList",
        "numberedList",
        "|",
        "outdent",
        "indent",
        "|",
        "uploadImage",
        "|",
        Video.pluginName,
        "|",
        PDF.pluginName,
        "blockQuote",
        "insertTable",
        "undo",
        "redo",
      ],
      image: {
        toolbar: [
          "imageStyle:full",
          "imageStyle:side",
          "|",
          "imageTextAlternative",
        ],
      },
      table: {
        contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
      },
      // initialData: "<p>hello&nbsp;<strong>world</strong></p>",
      initialData: "",
      ...this.editorConfig,
    })
      .then((editor) => {
        // CKEditorInspector.attach(editor);
        // 设置编辑器配置文件
        // const videoConfig = {
        //   url: "http://www.baidu.com",
        // };
        this.editor = editor;
        // editor.videoConfig = videoConfig;
        editor.videoConfig = this.editorConfig && this.editorConfig.videoConfig;
        editor.isReadOnly = this.disabled;
        this.ready && this.ready(editor);
        console.log("Editor was initialized", editor);
      })
      .catch((error) => {
        console.error(error.stack);
      });
  }
  destroy() {
    if (this.renderEditor) {
      // this.renderEditor.destroy();
      this.renderEditor = null;
    }
  }
}
