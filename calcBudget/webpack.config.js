const path = require('path')

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/app.model'),
    },

    output: {
        path: path.resolve(__dirname, './public'),
        filename: "app.bundle.model",
    },

    mode: 'development',

    devServer: {
        static: path.join(__dirname, './public'),
    },

    devtool: 'eval-cheap-source-map',
}