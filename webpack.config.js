const HtmlWebpackPlugin = require('html-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const publicPath = '/';
const buildPath = 'build';

module.exports = {
    mode: "development",//development/production

    // Enable sourcemaps for debugging webpack's output.
    devtool: "inline-source-map",//inline-source-map/source-map
	devServer: {
		publicPath: publicPath,
		contentBase: path.resolve(__dirname, buildPath), 
		hot: true,
		//liveReload: true,
		inline:true,
		//hotOnly: true,
	},
	output: {
        path: path.resolve(__dirname, buildPath), 
        filename: 'bundle.js', 
        publicPath: publicPath, //添加
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
	plugins: [
		new webpack.HotModuleReplacementPlugin(), //添加
        new webpack.NamedModulesPlugin(), //添加，官方推荐的帮助分析依赖的插件
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
		hash: true,
		inject: true,
		title: '社群关系分析系统',
		filename:'index.html',
		template: 'index.html',
		}),
		new copyWebpackPlugin([{
		from:__dirname+'/node_modules/react/umd/',//打包的静态资源目录地址
		to:'./react' //打包到dist下面的public
		},{
		from:__dirname+'/node_modules/react-dom/umd/',//打包的静态资源目录地址
		to:'./react-dom' //打包到dist下面的public
		},{
		from:__dirname+'/assets/',//打包的静态资源目录地址
		to:'./assets' //打包到dist下面的public
		}]),
	],
	
};