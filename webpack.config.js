const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    devServer: {
        port: 3001,
        static: path.resolve(__dirname, "dist"),
    },
    output: {
        publicPath: "auto",
        path: path.resolve(__dirname, "dist"),
        clean:true,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "atendidos",
            filename: "remoteEntry.js",
            exposes: {
                "./Atendidos": "./src/components/Atendidos",
            },
            shared: {
                react: {
                    singleton: true,
                    eager: true,
                },  
                "react-dom": {
                    singleton: true,
                    eager: true,
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public/index.html"),
        }),
    ],
    resolve: {
        extensions: [".js", ".jsx"],
    },
}     

