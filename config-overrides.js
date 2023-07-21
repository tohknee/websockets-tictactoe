const { override, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
  // Add a new rule for SVG files using SVGR with throwIfNamespace: false
  addWebpackModuleRule({
    test: /\.svg$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          throwIfNamespace: false,
        },
      },
    ],
  })
);
