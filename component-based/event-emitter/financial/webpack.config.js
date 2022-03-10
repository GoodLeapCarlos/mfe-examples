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
      name: 'financial_app',
      library: { type: 'var', name: 'financial_app' },
      filename: 'remoteEntry.js',
      shared: {
        "react": {
          singleton: true,
          requiredVersion: '^17.0.2'
        },
        "react-dom": {
          singleton: true,
          requiredVersion: '^17.0.2'
        }
      },
    // COMMENT OUT when doing local development against this application
    exposes: {
      './FinancialAppEventsHandler': './src/app-events-handler',
      './APP_EVENTS': './src/app-events',
      './FinancialAccountListSideBar': './src/components/accounts-list-side-bar',
      './FinancialAccountsListDetails': './src/components/accounts-list-details',
      './DisplayDate': './src/shared/components/display-date'
    }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};