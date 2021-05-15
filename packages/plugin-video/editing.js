/*
 * @Author: your name
 * @Date: 2021-05-13 15:32:38
 * @LastEditTime: 2021-05-14 08:54:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RGEditor\packages\plugin-video\editing.js
 */

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import { COMMAND_NAME__Video, SCHEMA_NAME__Video, CUSTOM_PROPERTY__Video } from "./constant";
import { toWidget } from "@ckeditor/ckeditor5-widget/src/utils";
import VideoCommand from "./command";

const IMAGE_CLASS = ["editing-video"];
export default class VideoEditing extends Plugin {
  static get requires() {
    return [Widget];
  }
  
  static get pluginName() {
    return "VideoEditing";
  }
  init() {
    const editor = this.editor;
    this._defineSchema();
    this._defineConverters();
    // 注册一个 VideoCommand 命令
    editor.commands.add(COMMAND_NAME__Video, new VideoCommand(editor));
  }
  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register(SCHEMA_NAME__Video, {
      isObject: true,
      isBlock: true,
      allowWhere: "$block",
      allowAttributes: ["src", "name", "style"],
    });
  }
  _defineConverters() {
    const conversion = this.editor.conversion;

  // SCHEMA_NAME__IMAGE --> "image"
  conversion.for("editingDowncast").elementToElement({
    model: SCHEMA_NAME__Video,
    view: (element, { writer }) => {
      const widgetElement = createImageViewElement(element, writer);
      // 添加自定义属性，以判断是否为 Image Model
      // CUSTOM_PROPERTY__IMAGE --> "is-image"
      writer.setCustomProperty(CUSTOM_PROPERTY__Video, true, widgetElement);
      return toWidget(widgetElement, writer);
    },
  });

  conversion.for("dataDowncast").elementToElement({
    model: SCHEMA_NAME__Video,
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
  const figure = writer.createContainerElement("figure", {
    class: IMAGE_CLASS,
  });

  // 使用 createEmptyElement 创建 img 标签，并设置属性
  const imageElement = writer.createEmptyElement("iframe");
  ["src", "name", "style"].map((k) => {
    writer.setAttribute(k, element.getAttribute(k), imageElement);
  });

  // 将 img 作为子节点插入到 figure
  writer.insert(writer.createPositionAt(figure, 0), imageElement);
  return figure;
}

// 根据 View 创建图片 Model
export function createImageModel(view, { writer }) {
  const params = {};
  const imageInner = view.getChild(0);

  ["src", "loop"].map((k) => {
    params[k] = imageInner.getAttribute(k);
  });

  return writer.createElement(SCHEMA_NAME__Video, params);
}