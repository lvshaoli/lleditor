/*
 * @Author: your name
 * @Date: 2021-05-13 15:32:38
 * @LastEditTime: 2021-05-14 14:17:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RGEditor\packages\plugin-PDF\editing.js
 */

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import { COMMAND_NAME__PDF, SCHEMA_NAME__PDF, CUSTOM_PROPERTY__PDF } from "./constant";
import { toWidget } from "@ckeditor/ckeditor5-widget/src/utils";
import PDFCommand from "./command";

const IMAGE_CLASS = ["editing-PDF"];
export default class PDFEditing extends Plugin {
  static get requires() {
    return [Widget];
  }
  
  static get pluginName() {
    return "PDFEditing";
  }
  init() {
    const editor = this.editor;
    this._defineSchema();
    this._defineConverters();
    // 注册一个 PDFCommand 命令
    editor.commands.add(COMMAND_NAME__PDF, new PDFCommand(editor));
  }
  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register(SCHEMA_NAME__PDF, {
      isObject: true,
      isBlock: true,
      allowWhere: "$block",
      allowAttributes: ["src", "width", "height"],
    });
  }
  _defineConverters() {
    const conversion = this.editor.conversion;

  // SCHEMA_NAME__IMAGE --> "image"
  conversion.for("editingDowncast").elementToElement({
    model: SCHEMA_NAME__PDF,
    view: (element, { writer }) => {
      const widgetElement = createImageViewElement(element, writer);
      // 添加自定义属性，以判断是否为 Image Model
      // CUSTOM_PROPERTY__IMAGE --> "is-image"
      writer.setCustomProperty(CUSTOM_PROPERTY__PDF, true, widgetElement);
      return toWidget(widgetElement, writer);
    },
  });

  conversion.for("dataDowncast").elementToElement({
    model: SCHEMA_NAME__PDF,
    view: (element, { writer }) =>
      createImageViewElement(element, writer),
  });
  conversion.for("upcast").elementToElement({
    view: {
      name: "figure",
      classes: IMAGE_CLASS,
    },
    model: createImageModel,
  });
  }
}


// 根据 Model 创建图片 View
export function createImageViewElement(element, writer) {

  // 使用 createContainerElement 创建容器元素
  const figure = writer.createContainerElement("div", {
    class: ['pdf-editing-container'],
  });


  const srcArr = element.getAttribute("src");
  for (let index = 0; index < srcArr.length; index++) {
   const imageElement = writer.createEmptyElement("img");
   writer.setAttribute("src", srcArr[index], imageElement);

   
  ["width", "height"].map((k) => {
    writer.setAttribute(k, element.getAttribute(k), imageElement);
  });
   writer.insert(writer.createPositionAt(figure, 0), imageElement);
  }

  // 
  return figure;
}
// 根据 View 创建图片 Model
export function createImageModel(view, { writer }) {
  const params = {};
  const imageInner = view.getChild(0);
  ["src", "height", "width"].map((k) => {
    params[k] = imageInner.getAttribute(k);
  });

  return writer.createElement(SCHEMA_NAME__PDF, params);
}