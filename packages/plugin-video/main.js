/*
 * @Author: your name
 * @Date: 2021-05-13 15:32:45
 * @LastEditTime: 2021-05-14 08:53:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RGEditor\packages\plugin-video\main.js
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ToolbarUI from './toolbar-ui';
import VideoEditing from './editing';
import { COMMAND_NAME__Video } from './constant';
import "./video.less";

export default class Video extends Plugin {
  static get requires() {
    return [ VideoEditing, ToolbarUI ];
  }
  static get pluginName() {
   return COMMAND_NAME__Video;
  }
}