const webpack = require("webpack");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');
const path = require('path');
const fs = require('fs-extra');

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
    require('./dist/server/index');
}

const JSConfig = {
    mode: mode,
    entry: {
        login: './src/client/login/index.js',
        register: './src/client/register/index.js',
        edit: './src/client/edit/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, "dist/server/public/scripts"),
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
                test: /\.pug$/,
                loader: 'pug-plain-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
              }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new VueLoaderPlugin()
    ],
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        },
    },
};

const SASSConfig = {
    mode: mode,
    entry: {
        index: './src/client/styles/index.scss',
        theme: './src/client/styles/theme.scss',
        accountLayout: './src/client/styles/accountLayout.scss',
        screenplayLayout: './src/client/styles/screenplayLayout.scss',
        screenplayView: './src/client/styles/screenplayView.scss',
        screenplayEdit: './src/client/styles/screenplayEdit.scss'
    },
    output: {
        //filename: '[name].css',
        path: path.resolve(__dirname, "dist/server/public/styles"),
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { url: false }
                    },
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

fs.emptyDirSync('./dist');

fs.copySync('./src/server', './dist/server');
fs.copySync('./src/shared', './dist/shared');

webpack([JSConfig, SASSConfig], (err, stats) => {
    let isOk = handleError(err, stats);
    if(isOk)
        startServer();
});