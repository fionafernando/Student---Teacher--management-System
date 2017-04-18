module.exports = {
  entry: "./bootstrap.js",
  output: {
    filename: "compiled.js"
  },
  module: {
    loaders: [
  {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel-loader',
    // query: {
    //   presets: ['env']
    // }
  }
]
  }
}