/*
 * @Author: your name
 * @Date: 2021-05-11 11:11:55
 * @LastEditTime: 2021-05-11 14:37:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RGEditor\packages\plugin-bold\editing.js
 */
// editing.js
import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import { toWidget } from "@ckeditor/ckeditor5-widget/src/utils";
import Widget from "@ckeditor/ckeditor5-widget/src/widget";
import BoldCommand from "./command";
import { COMMAND_NAME__BOLD, SCHEMA_NAME__BOLD } from "./constant";

export default class BoldEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  static get pluginName() {
    return "BoldEditing";
  }
  init() {
    const editor = this.editor;
    this._defineSchema();
    this._defineConverters();
    // 注册一个 BoldCommand 命令
    editor.commands.add(COMMAND_NAME__BOLD, new BoldCommand(editor));
  }

  // 注册 schema
  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register(SCHEMA_NAME__BOLD, {
      isInline: true, // 是否为行内元素
      isObject: true, // 是否为一个整体
      allowWhere: "$text", // 允许在哪个 schema 插入
      allowAttributes: ["value"], // 允许携带哪些属性
    });
  }
  // 定义转换器
  _defineConverters() {
    const conversion = this.editor.conversion;
    // 将 model 渲染为 HTML
    conversion.for("editingDowncast").elementToElement({
      model: SCHEMA_NAME__BOLD,
      view: (modelElement, { writer }) => {
        const element = createDowncastElement(modelElement, writer);
        return toWidget(element, writer);
      },
    });
    conversion.for("dataDowncast").elementToElement({
      model: SCHEMA_NAME__BOLD,
      view: (modelElement, { writer }) =>
        createDowncastElement(modelElement, writer),
    });

    // 将 HTML 渲染为 model
    conversion.for("upcast").elementToElement({
      view: {
        name: "strong",
      },
      model: (view, { writer }) => {
        return writer.createElement(SCHEMA_NAME__BOLD, { value: "wise" });
      },
    });

  }
}

function createDowncastElement(modelElement, writer) {
  const element = writer.createContainerElement("strong");
  const value = modelElement.getAttribute("value");
  const innerText = writer.createText(value);
  writer.insert(writer.createPositionAt(element, 0), innerText);

  return element;
}
