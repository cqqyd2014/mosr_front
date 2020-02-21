const path = require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const  { CleanWebpackPlugin } =require('clean-webpack-plugin');
const webpack = require('webpack');


module.exports = {
  entry: './src/index.tsx',
resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx",".js"]
    },
plugins:[
	
	new CleanWebpackPlugin(),
	new HtmlWebpackPlugin({
		title:'社群关系分析系统',
		template: 'template.html'
	}),
	
],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
module: {
        rules: [	
	{
            test: /\.less$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
        },
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
            },
{
        test: /\.css$/,
        use: 'css-loader'
        
      }
        ]
    }
};
