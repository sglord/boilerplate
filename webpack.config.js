// const path = require('path');

module.exports = {
	mode: 'development', // "production" | "development" | "none"
	entry: './src/client/index.jsx',
	// entry:{
	//   app: './index.js'
	// },
	output: {
		path: `${__dirname}/static`,
		// filename: "[name].[chunkhash:8].js"
		filename: '[name].bundle.js',
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
	},
	devtool: 'eval-source-map',
	stats: {
		preset: 'errors-warnings',
		colors: true,
		// context: '../src/components',
		builtAt: true,
		errors: true,
		errorDetails: true,
		errorStack: true,
		logging: 'warn',
		performance: true,
	},
	bail: true, // boolean,
	cache: false, // boolean,
	watchOptions: {
		poll: true,
		// poll: 2500,
		aggregateTimeout: 600,
		ignored: ['node_modules/**'],
	},
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
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: 'eslint-loader',
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
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
