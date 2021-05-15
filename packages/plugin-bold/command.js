/*
 * @Author: your name
 * @Date: 2021-05-11 11:10:36
 * @LastEditTime: 2021-05-11 15:06:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RGEditor\packages\plugin-bold\command.js
 */
// command.js

import Command from "@ckeditor/ckeditor5-core/src/command";
import { SCHEMA_NAME__BOLD } from "./constant";

export default class BoldCommand extends Command {
  refresh() {
    this.isEnabled = true;
  }

  execute() {
    const model = this.editor.model;
    model.change((writer) => {
      const element = writer.createElement(SCHEMA_NAME__BOLD, {
        value: this._getSelectionText(),
      });
      model.insertContent(element);
      writer.setSelection(element, "on");
    });
  }

  _getSelectionText() {
    const model = this.editor.model;
    const selection = model.document.selection;

    let str = "";

    for (const range of selection.getRanges()) {
      for (const item of range.getItems()) {
        str += item.data;
      }
    }

    return str;
  }
}