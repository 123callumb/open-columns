const path = require('path');
const sass = require('sass');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const defaultConfig = {
    target: 'web',
    entry: {
        'open-columns': './src/index.ts'
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].js',
        library: 'open-columns',
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
    watchOptions: {
        ignored: /node_modules/
    },
    plugins: [new MiniCssExtractPlugin({
        filename: 'open-columns.default.css'
    })],
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: [/node_modules/, /test/],
                use: ['babel-loader', 'ts-loader']
            },
            {
                test: /\.scss$/,
                exclude: [/node_modules/, /test/],
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: sass
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.scss']
    }
}

module.exports = (env, args) => {
    return defaultConfig;
}