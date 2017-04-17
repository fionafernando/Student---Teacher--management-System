module.exports = {
  entry: "./App.js",
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