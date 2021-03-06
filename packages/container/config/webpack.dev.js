const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJSON = require('../package.json')


const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8082/',
  },
  devServer: {
    port: 8082,
    historyApiFallback: true
  },
  plugins: [
    new ModuleFederationPlugin({
      // not strictly required for the host but the docs suggest to do so
      name: 'container',
      remotes: {
        // 'marketing' matches up with the name we defined in webpack.dev.js in the marketing module
        marketing: 'marketing@http://localhost:8081/remoteEntry.js',
        auth: 'auth@http://localhost:8083/remoteEntry.js'
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
