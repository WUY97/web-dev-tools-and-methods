const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    devtool: 'source-map',
    devServer: {
        static: path.join(__dirname, 'public'),
        compress: true,
        port: 3000,
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'public'),
    },

    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: 'defaults' }],
                        ],
                    },
                },
            },
        ],
    },
};