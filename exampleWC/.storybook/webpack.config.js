const path = require("path");

module.exports = ({ config }) => {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...(config.resolve && config.resolve.alias),
        angular: require.resolve("angular"),
      },
    },
  };
};
