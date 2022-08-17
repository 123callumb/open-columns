const path = require('path');
const sass = require('sass');

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
                    "style-loader",
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