/*
 * @Author: your name
 * @Date: 2021-05-11 11:19:07
 * @LastEditTime: 2021-05-11 11:19:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RGEditor\packages\plugin-bold\main.js
 */
// plugin-bold/main.js

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ToolbarUI from './toolbar-ui';
import BoldEditing from './editing';
import { COMMAND_NAME__BOLD } from './constant';

export default class Bold extends Plugin {
  static get requires() {
    return [ BoldEditing, ToolbarUI ];
  }
  static get pluginName() {
   return COMMAND_NAME__BOLD;
  }
}