/*
 * @Author: your name
 * @Date: 2021-05-13 15:32:18
 * @LastEditTime: 2021-05-13 17:12:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RGEditor\packages\plugin-video\command.js
 */

import Command from "@ckeditor/ckeditor5-core/src/command";

import { insertVideo } from "./util";

 export default class VideoCommand extends Command {
    refresh() {
        this.isEnabled = true;
      }
    
      execute(data) {
          console.log('Video Execute', data);
          const model = this.editor.model;
          insertVideo(model, data);
      }
 }