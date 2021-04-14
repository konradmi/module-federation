const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJSON = require('../package.json')

const domain = process.env.PRODUCTION_DOMAIN

const devConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    // publicPath/filename is what webpack will use when injecting the script tag in /public/index.html
    // The reason for that is that in cloudfront index.html and filename wont be in the same dir
    publicPath: '/container/latest/'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`
      },
      shared: packageJSON.dependencies
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}

module.exports = merge(commonConfig, devConfig)
