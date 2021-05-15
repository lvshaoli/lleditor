/*
 * @Author: your name
 * @Date: 2021-05-13 15:32:55
 * @LastEditTime: 2021-05-14 10:08:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RGEditor\packages\plugin-video\toolbar-ui.js
 */

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import { COMMAND_NAME__Video, COMMAND_LABEL__Video } from "./constant";
import videoIcon from "@plugin/assets/Icons/video.svg";
import VideoForm from "./form/video-form";
import eventObsever from "@plugin/utils/Observer";

export default class VideoToolbarUI extends Plugin {
    init() {
        this._createToolbarButton();
      }
    
      _createToolbarButton() {
        const editor = this.editor;
        const command = editor.commands.get(COMMAND_NAME__Video);
        editor.ui.componentFactory.add(COMMAND_NAME__Video, (locale) => {
            const view = new ButtonView(locale);
            view.set({
              label: COMMAND_LABEL__Video,
              tooltip: true,
              icon: videoIcon,
              // withText: true, // 在按钮上展示 label
              class: "toolbar_button_video",
            });
            // 将按钮的状态关联到命令对应值上
            view.bind("isOn", "isEnabled").to(command, "value", "isEnabled");
            // 点击按钮时触发相应命令
            this.listenTo(view, "execute", () => {
                new VideoForm({ callBack: (e) => {
                  eventObsever.$emit("videoUpload", e);
                  eventObsever.$on("videoInsert", (config) => {
                    const { src, name, style } = config || {};
                    editor.execute(COMMAND_NAME__Video, {src, name, style: style || "width: 100%; height: 100%;"});
                  })
                } });
            });
            return view;
          });
      }
}