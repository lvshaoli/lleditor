/*
 * @Author: your name
 * @Date: 2021-05-11 11:00:57
 * @LastEditTime: 2021-05-14 16:51:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \RGEditor\packages\my-editor\webpack.config.js
 */
"use strict";

const path = require("path");
const { styles } = require("@ckeditor/ckeditor5-dev-utils");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    library: 'LLEditor', // 指定类库名,主要用于直接引用的方式(比如使用script 标签)
    libraryTarget: 'umd',
		libraryExport: 'default'
  },
  resolve: {
    alias: {
      "@plugin": path.resolve( __dirname, "../"),
    },
  },
  optimization: {
    // minimizer: [
    //   new TerserPlugin({
    //     terserOptions: {
    //       output: {
    //         // Preserve CKEditor 5 license comments.
    //         comments: /^!/,
    //       },
    //     },
    //     extractComments: false,
    //   }),
    // ],
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ["raw-loader"],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            options: {
              injectType: "singletonStyleTag",
              attributes: {
                "data-cke": true,
              },
            },
          },
          {
            loader: "postcss-loader",
            options: styles.getPostCssConfig({
              themeImporter: {
                themePath: require.resolve("@ckeditor/ckeditor5-theme-lark"),
              },
              minify: true,
            }),
          },
        ],
      },
      {
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			}
    ],
  },
  externals: {
		vue: {
			commonjs: 'vue',
			commonjs2: 'vue',
			amd: 'vue',
			root: 'Vue'
		}
	},
  plugins: [
    new CleanWebpackPlugin()
  ],
  performance: { hints: false },
};