/*
 * @Author: your name
 * @Date: 2021-05-13 15:32:55
 * @LastEditTime: 2021-05-14 14:52:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RGEditor\packages\plugin-PDF\toolbar-ui.js
 */

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import { COMMAND_NAME__PDF, COMMAND_LABEL__PDF } from "./constant";
import PDFIcon from "@plugin/assets/Icons/PDF.svg";
import PDFForm from "./form/PDF-form";
import eventObsever from "@plugin/utils/Observer";
import { pdfToCanvas } from "./form/pdfHelper";

export default class PDFToolbarUI extends Plugin {
    init() {
        this._createToolbarButton();
      }
    
      _createToolbarButton() {
        const editor = this.editor;
        const command = editor.commands.get(COMMAND_NAME__PDF);
        editor.ui.componentFactory.add(COMMAND_NAME__PDF, (locale) => {
            const view = new ButtonView(locale);
            view.set({
              label: COMMAND_LABEL__PDF,
              tooltip: true,
              icon: PDFIcon,
              // withText: true, // 在按钮上展示 label
              class: "toolbar_button_PDF",
            });
            // 将按钮的状态关联到命令对应值上
            view.bind("isOn", "isEnabled").to(command, "value", "isEnabled");
            // 点击按钮时触发相应命令
            this.listenTo(view, "execute", () => {
                new PDFForm({ callBack: (url) => {
                  // editor.execute(COMMAND_NAME__PDF, {src: url, width: 300, height: 500});
                  
                pdfToCanvas(url, editor).then(res => {
                  console.log('发出执行完毕', res);
                  // editor.execute(COMMAND_NAME__PDF, {src: res, width: 300, height: 500});
                });
                  // eventObsever.$emit("PDFUpload", e);
                  // eventObsever.$on("PDFInsert", (config) => {
                  //   const { src, name, style } = config || {};
                  //   editor.execute(COMMAND_NAME__PDF, {src, name, style: style || "width: 100%; height: 100%;"});
                  // })
                } });
            });
            return view;
          });
      }
}