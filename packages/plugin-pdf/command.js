/*
 * @Author: your name
 * @Date: 2021-05-13 15:32:18
 * @LastEditTime: 2021-05-14 12:36:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RGEditor\packages\plugin-video\command.js
 */

import Command from "@ckeditor/ckeditor5-core/src/command";

import { insertPDF } from "./util";

 export default class PDFCommand extends Command {
    refresh() {
        this.isEnabled = true;
      }
    
      execute(data) {
          console.log('PDF Execute', data);
          const model = this.editor.model;
          insertPDF(model, data);
      }
 }