

module.exports = {
	//entry: "./src/index.tsx",
	output: {
		filename: "bundle.js",
		path: __dirname + "/dist"
	},

	//devtool: "source-map",

	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"]
	},

	module: {
		rules: [
			{ test: /\.ts(x?)$/,exclude: /node_modules/, loader: "ts-loader" },

			{ enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
		]
	},
	externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
	plugins: [
		
		
		
	],
};