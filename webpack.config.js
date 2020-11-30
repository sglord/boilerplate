// add support for es6 in node
// add hot module injection reloading
// add code splitting/lazy/chunking
// make own babel plugin
const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
const { DefinePlugin } = require('webpack');

module.exports = {
	mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
	entry: ['./src/client'],
	devtool: 'cheap-source-map',
	cache: true,
	output: {
		path: path.resolve(__dirname, 'static'),
		// filename: "[name].[chunkhash:8].js"
		filename: '[name].bundle.js',
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json' /* '.ts', '.tsx' */],
	},
	experiments: {
		mjs: true,
	},
	watchOptions: {
		poll: true,
		aggregateTimeout: 600,
		ignored: ['node_modules/**'],
	},
	plugins: [
		new WebpackNotifierPlugin({
			// dynamically gathers title
			title: new DefinePlugin({
				NAME: JSON.stringify(require('./package.json').name),
			}).definitions.NAME.slice(1, -1), // slice to remove "" marks
			emoji: true,
			excludeWarnings: true,
			contentImage: undefined,
			alwaysNotify: true,
		}),
		new DefinePlugin({
			'process.env': '{}',
			global: {},
		}),
	],
	// devServer: {
	// 	hot: true,
	// 	host: 'IP ADDRESS HERE', // for external access to dev server
	// 	onListening: function(server) {
	// 		const port = server.listeningApp.address().port;
	// 		console.log('Listening on port:', port);
	// 	},
	// 	open:true, // dev servre opens the browser once app is listening
	// 	// pass --open-page "/other/page" to load that specific via cli
	// 	port: 8080,
	// 	quiet: true, // nothing but startup sent to console; no errors or warnings
	// },
	// target: "node", // enum,
	// optimization: {
	// 	splitChunks: {
	// 		chunks: 'all',
	// 	},
	// },
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: 'eslint-loader',
			},
			{
				test: /\.(png|jp(e*)g|svg|gif)$/,
				use: [
					{
						loader: 'file-loader',
					},
				],
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				include: path.resolve(__dirname, 'src/client'),
				use: {
					loader: 'babel-loader',
					//   query: {
					//     cacheDirectory: true
					// },
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
					},
				},
			},
		],
	},
};
