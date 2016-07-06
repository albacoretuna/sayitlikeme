module.exports = {
    context: __dirname ,
    entry: __dirname + "/app/index.js",
    output: {
        path: __dirname + "/public-",
        filename: "bundle.js",
    },
module: {
  loaders: [
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel', // 'babel-loader' is also a legal name to reference
      query: {
        presets: ['react', 'es2015']
      }
    }
  ]
}
};
