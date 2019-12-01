const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => ({
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: 'dist',
  },
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'head',
      hash: true,
      templateParameters: {
        'MAP_APP_API_KEY': env.MAP_APP_API_KEY,
      },
      template: './src/index.html',
      filename: 'index.html',
    }),
  ]
});
