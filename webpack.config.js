const path = require('path');

module.exports = {
  entry: './src/index.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: {
      keep: 'index.html',
    },
  },

  devServer: {
    client: {
      overlay: false,
    },

    static: {
      directory: path.join(__dirname, 'dist'),
    },
      port: 9000,
  },

  module: {
      rules: [
            {
             test: /\.css$/i,
             use: ['style-loader', 'css-loader'],
            },
            {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
           },
           {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
           },
      ],
  },
};