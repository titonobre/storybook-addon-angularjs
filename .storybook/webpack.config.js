const path = require("path");

module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.resolve.alias = {
    ...storybookBaseConfig.resolve.alias,
    angular: require.resolve("angular")
  };

  return storybookBaseConfig;
};
