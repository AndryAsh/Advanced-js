const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin  = require('html-webpack-exclude-assets-plugin');

module.exports = {
    entry: {
        main: ["@babel/polyfill", "./src/public/js/index.js"]
    },
    output: {
        path: path.join(__dirname, './dist/public'),
        publicPath: "/",
        filename: "js/[name].js"
    },
    target: 'web',
    devtool: "#source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/public/template.html',
            filename: 'index.html',
            excludeChunks: ['server'],
	    excludeAssets: [ / index.js / ],
        }),
	new HtmlWebpackExcludeAssetsPlugin(),
	new CopyWebpackPlugin([
        {
            from: './src/public/img',
            to: 'img'
        },
        {
            from: './src/public/css',
            to: 'css'
        }
       ]),
    ]
};
