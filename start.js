const webpack = require("webpack");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');
const path = require('path');

const mode = 'development';

function handleError(err, stats)
{
    if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }
        return false;
      }
    
      const info = stats.toJson();
    
      if (stats.hasErrors()) {
        console.error(info.errors);
        return false;
      }
    
      if (stats.hasWarnings()) {
        console.warn(info.warnings);
      }
      return true;
}

function startServer()
{
    require('./server/index');
}

const JSConfig = {
    mode: mode,
    entry: {
        login: './client/login/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, "server/public/scripts"),
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                loader: "sass-loader"
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};

const SASSConfig = {
    mode: mode,
    entry: {
        index: './client/styles/index.scss'
    },
    output: {
        //filename: '[name].css',
        path: path.resolve(__dirname, "server/public/styles"),
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    "sass-loader"
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new IgnoreEmitPlugin(/\.js$/)
    ],
};


webpack([JSConfig, SASSConfig], (err, stats) => {
    let isOk = handleError(err, stats);
    startServer();
});