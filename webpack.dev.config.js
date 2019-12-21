
const copyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const config = require('./webpack.common.config');
config.mode = "development";
config.devtool = "inline-source-map";
config.devServer = {
	hot: true,
	publicPath: '/dist/',
	inline: true,
};
config.output = {
	//path: path.resolve(__dirname, buildPath), 
	//filename: 'bundle.js', 
	publicPath: '/dist/', //添加
};
config.plugins.push(new CleanWebpackPlugin());
config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(new HtmlWebpackPlugin({
	hash: true,
	inject: true,
	title: '社群关系分析系统-测试',
	filename: 'index.html',
	template: 'index.html',
}));
config.plugins.push(new copyWebpackPlugin([{
			from: __dirname + '/node_modules/react/umd/',//打包的静态资源目录地址
			to: './react' //打包到dist下面的public
		}, {
			from: __dirname + '/node_modules/react-dom/umd/',//打包的静态资源目录地址
			to: './react-dom' //打包到dist下面的public
		}, {
			from: __dirname + '/assets/',//打包的静态资源目录地址
			to: './assets' //打包到dist下面的public
		}]));
module.exports = config;