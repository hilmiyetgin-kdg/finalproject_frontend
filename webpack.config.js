import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'

const config = {
    devtool: 'source-map',
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('src/html/index.html'),
        }),
        new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.s?scss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/i,
                type: 'asset'
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset'
            },
        ]
    },
    devServer: {
        static: { directory: path.resolve('dist') },
        hot: false, // optional, but don't enable hot _and_ liveReload together
        liveReload: true,
        open: true,
        port: 8081
    },
    output: {
        // Clean 'dist' folder before generating new files
        clean: true,
    },
    experiments: {
        topLevelAwait: true
    }

}

export default config
