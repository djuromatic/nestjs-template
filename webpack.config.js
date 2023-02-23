const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './certs/nestjs-template', to: './apps/nestjs-template/certs' },
      ],
    }),
  ],
};
