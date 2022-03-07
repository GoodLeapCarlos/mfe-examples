const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  devtool: 'hidden-source-map',
  devServer: {
    // contentBase
    static : {
        directory : path.join(__dirname, "public/")
      },
      port: 3001,
      // publicPath
      devMiddleware:{
         publicPath: "http://localhost:3001/",
      },
      // hotOnly
      hot: "only",
      historyApiFallback: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
  },
  output: {
    publicPath: 'http://localhost:3001/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'mfea_app',
      library: { type: 'var', name: 'mfea_app' },
      filename: 'remoteEntry.js',
      shared: {
        "react": {
          singleton: true,
          requiredVersion: '^17.0.2'
        },
        "react-dom": {
          singleton: true,
          requiredVersion: '^17.0.2'
        },
        "react-router-dom": {
          singleton: true,
          requiredVersion: '^6.2.1'
        }
      },
    exposes: {
      './routes': './src/funding-routes',
      './displayDates': './src/shared/components/display-date'
    }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};