const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const packageJSON = require('../package.json')

const commonConfig = require('./webpack.common')

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8081/',
  },
  devServer: {
    port: 8081,
    historyApiFallback: true
  },
  plugins: [
    new ModuleFederationPlugin({
      // name declares some sort of global variable when our script loads up in the container
      name: 'marketing',
      filename: 'remoteEntry.js',
      exposes: {
        // these are the ONLY things the host will be able to ask for from the marketing module
        './MarketingApp': './src/bootstrap'
      },
      // without this section react and react-dom for example would be loaded by 'marketing' and by 'container'.
      // We want only one copy to be loaded
      shared: packageJSON.dependencies
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}

module.exports = merge(commonConfig, devConfig)
