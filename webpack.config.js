const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'client', 'src', 'components', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'server', 'public'),
    filename: 'bundle.js'
  },

  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx']
  },
module: {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
    }
  ]
}
};