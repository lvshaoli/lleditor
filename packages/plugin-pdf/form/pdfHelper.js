/*
 * @Author: your name
 * @Date: 2021-05-14 12:31:57
 * @LastEditTime: 2021-05-14 14:54:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RGEditor\packages\plugin-pdf\form\pdfHelper.js
 */

import PDFJS from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.js";
import { COMMAND_NAME__PDF } from "../constant";
PDFJS.GlobalWorkerOptions.workerSrc = "https://cdn.bootcss.com/pdf.js/2.0.943/pdf.worker.min.js";
// import { domParser } from "../../UI/util";


export function pdfToCanvas(pdfArrayBuffer, editor) {
    const imgArr = [];
    return new Promise(async (resolve, reject) => {
      const pdfData = await PDFJS.getDocument(pdfArrayBuffer);
      const numPages = pdfData.numPages;
      for (let i = 1; i <= numPages; i++) {
        let canvas = document.createElement("canvas");
        let scale = 1;
        let page = await pdfData.getPage(i);
        let viewport = page.getViewport(scale); // reference canvas via context

        canvas.id = "pageNum" + i;
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        const cxt = canvas.getContext("2d");
        let renderContext = {
          canvasContext: cxt,
          viewport: viewport,
        };
        page.render(renderContext);
        setTimeout(() => {
        const imgurl = canvas.toDataURL("image/png");
        imgArr.push(imgurl);
        editor.execute(COMMAND_NAME__PDF, {src: [imgurl], width: "100%", height: "100%"});
        }, 1000);
      }
    
        // resolve(imgArr);
      setTimeout(() => {
        resolve(imgArr); //防止 canvas 没有绘制完
      }, 5000);
    });
  }