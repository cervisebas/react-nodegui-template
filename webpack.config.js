const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg|bmp|otf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: 'dist',
            },
          },
        ],
      },
      {
        test: /\.node$/,
        use: 'node-loader',
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx', '.json'],
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
    }),
  ],
};
