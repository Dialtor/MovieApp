const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development", // "production" | "development" | "none"
    // El "mode" elegido le dice a webpack que use sus optimizaciones integradas en consecuencia.
    output: {
        clean: true //Limpia y hace refresh a todo el build de producción
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false
                }
            },
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /styles\.css/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader'
            }
        ]
    },

    optimization: {

    },

    plugins: [
        new HtmlWebPackPlugin({
            title: 'Template Webpack',
            template: './src/index.html'
        }),

        new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false,
        }),

        new CopyPlugin({
            patterns: [
                {from: 'src/assets/', to: 'assets/'}
            ]
        })
    ],

}
