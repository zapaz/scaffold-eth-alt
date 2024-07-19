const path = require('path');

module.exports = {
  entry: './src/ens.js',
  output: {
    library: {
      type: 'module',
    },
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  experiments: {
    outputModule: true,
  },
};
