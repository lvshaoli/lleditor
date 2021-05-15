/*
 * @Author: your name
 * @Date: 2021-05-13 15:32:45
 * @LastEditTime: 2021-05-14 10:46:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RGEditor\packages\plugin-PDF\main.js
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ToolbarUI from './toolbar-ui';
import PDFEditing from './editing';
import { COMMAND_NAME__PDF } from './constant';
import "./PDF.less";

export default class PDF extends Plugin {
  static get requires() {
    return [ PDFEditing, ToolbarUI ];
  }
  static get pluginName() {
   return COMMAND_NAME__PDF;
  }
}