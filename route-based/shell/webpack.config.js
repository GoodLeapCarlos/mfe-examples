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
      port: 3000,
      // publicPath
      devMiddleware:{
         publicPath: "http://localhost:3000/",
      },
      // hotOnly
      hot: "only",
      historyApiFallback: true
  },
  output: {
    publicPath: 'http://localhost:3000/',
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
      name: 'main_app',
      remotes: {
        'mfea_app': 'mfea_app@http://localhost:3001/remoteEntry.js',
        //'component-app': 'component_app@http://localhost:3001/remoteEntry.js',
      },
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
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};