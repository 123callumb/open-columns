const path = require('path');
const sass = require('sass');

const defaultConfig = {
    target: 'web',
    entry: {
        index: './src/open-columns.ts',
        themeDefault: './src/themes/default/index.scss'
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'open-colmns.js',
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
                    'style-loader',
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

modules.exports = (env, args) => {
    return defaultConfig;
}