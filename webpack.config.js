const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'development',
  entry: './src/scripts/index',
  devServer: {
      port: "9000",
    hot: true,
    watchOptions: {
      poll: true
    }
  },
  output: {
    path: __dirname,
    filename: 'build/bundle.js',
    sourceMapFilename: 'sourcemap'
  },
  resolve: {
    extensions: ['.js', '.jsx','css'],
    alias: {
      css: path.resolve(__dirname, 'css'),
    }
  },
  module: {
      rules:[
        {
            test: /\.(css|scss)?$/,
            use: ['style-loader','css-loader','sass-loader' ]
          },
         {
            test: /\.html$/,
            use: [ {
              loader: 'html-loader',
              options: {
                minimize: true
              }
            }],
         }
      ]
  },
  devtool: '#inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
        hash: true,
        title: 'Experia',
      filename: 'index.html',
      template: 'index.html',
      inject: false
    }),
  ]
}