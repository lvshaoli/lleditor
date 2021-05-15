'use strict';

/* eslint-env node */

const path = require( 'path' );
const webpack = require( 'webpack' );
const { bundler } = require( '@ckeditor/ckeditor5-dev-utils' );
const TerserPlugin = require( 'terser-webpack-plugin' );

module.exports = {
	mode: 'production',
	devtool: 'source-map',
	entry: path.join( __dirname, 'src', 'plugin.js' ),

	output: {
		library: 'llveditor',

		path: path.join( __dirname, 'dist' ),
		filename: 'llveditor.js',
		libraryTarget: 'umd',
		libraryExport: 'default'
	},

	optimization: {
		minimizer: [
			new TerserPlugin( {
				sourceMap: true,
				terserOptions: {
					output: {
						// Preserve CKEditor 5 license comments.
						comments: /^!/
					}
				},
				extractComments: false
			} )
		]
	},

	plugins: [
		new webpack.BannerPlugin( {
			banner: bundler.getLicenseBanner(),
			raw: true
		} )
	],

	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			}
		]
	},

	externals: {
		vue: {
			commonjs: 'vue',
			commonjs2: 'vue',
			amd: 'vue',
			root: 'Vue'
		}
	}
};