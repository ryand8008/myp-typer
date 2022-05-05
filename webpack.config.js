// For node to know our absolute file path we will be using the internal module path
const path = require("path");
import { writeFileSync, readFileSync } from 'fs';

// Our export here is the configuration webpack will use
module.exports = {
  // [mode] will determine how our code will be bundled.
  // "development" will be human readable
  // "production" will be minified
  mode: "development",
  // [entry] this is the file where the bundling starts from.
  entry: "./src/index.jsx",
  // [output] is a configuration object to determine how and where to bundle our code
  target: 'node',

  output: {
    // [path] is where to output
    path: path.join(__dirname, 'public'),
    // [filename] is the name of the file
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      }
    ]
  },
  resolve: {
    fallback: {
        "assert": false,
        "crypto": false,
        "http": false,
        "https": false,
        "os": false,
        "stream": false,
        "path": false,
        "buffer": false,
        "crypto": false,
        "url": false,
        "fs": "commonjs fs"

    },
    alias: {
      'pg-native': path.join(__dirname, 'pg-native'),
    },
  },
},
custom:
  webpack:
    includeModules:
       forceInclude:
         - pg,
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3002,
  }
}