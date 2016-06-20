module.exports = {
    context: __dirname ,
    entry: __dirname + "/app/index.js",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js",
    },
module: {
  loaders: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel', // 'babel-loader' is also a legal name to reference
      query: {
        presets: ['react']
      }
    }
  ]
}
};
