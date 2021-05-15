/*
 * @Author: your name
 * @Date: 2021-05-13 16:11:43
 * @LastEditTime: 2021-05-14 11:08:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RGEditor\packages\plugin-video\form\video-form.js
 */

import { domParser } from "../../UI/util";
import "./form.less";
export default class VideoForm  {
    constructor(prop) {
        const callBack = prop && prop.callBack;
        this.render();
        setTimeout(() => {
            this.bindClick(callBack);
        }, 0);
    }

    bindClick(callBack) {
       const myInput = document.querySelector('#myfile');
       myInput.click();
       myInput.onchange= (e) => {
           let files = document.getElementById("myfile").files[0];
           const url = this.getObjectURL(files);
           callBack && callBack(url);
       }
    };
    getObjectURL(file) {
        let url = null;
        if (window.createObjectURL != undefined) {
          // basic
          url = window.createObjectURL(file);
        } else if (window.webkitURL != undefined) {
          // webkit or chrome
          url = window.webkitURL.createObjectURL(file);
        } else if (window.URL != undefined) {
          // mozilla(firefox)
          url = window.URL.createObjectURL(file);
        }
        return url;
      };
    render() {
        const content = domParser(template());
         this.$container = document.querySelector('body');
         this.$container.appendChild(content);
    }
}

function template() {
    return `<div class="video-input"><input type="file" name="myfile" id="myfile"/></div>`
}