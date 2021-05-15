/*
 * @Author: your name
 * @Date: 2021-05-13 17:05:41
 * @LastEditTime: 2021-05-13 17:10:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RGEditor\packages\plugin-video\util.js
 */

import { SCHEMA_NAME__Video } from "./constant";
import { findOptimalInsertionPosition } from "@ckeditor/ckeditor5-widget/src/utils";
export function insertVideo(model, attributes = {}) {
    if (!attributes || !attributes.src) {
      return;
    }
  
    model.change((writer) => {
      const imageElement = writer.createElement(SCHEMA_NAME__Video, attributes);
      // 使用 findOptimalInsertionPosition 方法来获取最佳位置
      // 如果某个选择位于段落的中间，则将返回该段落之前的位置，不拆分当前段落
      // 如果选择位于段落的末尾，则将返回该段落之后的位置
      const insertAtSelection = findOptimalInsertionPosition(
        model.document.selection,
        model
      );
      model.insertContent(imageElement, insertAtSelection);
    });
  }