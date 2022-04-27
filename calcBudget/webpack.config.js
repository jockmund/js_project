const path = require('path')

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/app.js'),
    },

    output: {
        path: path.resolve(__dirname, './public'),
        filename: "app.bundle.js",
    },

    mode: 'development',

    devServer: {
        static: path.join(__dirname, './public'),
    },

    devtool: 'eval-cheap-source-map',
}