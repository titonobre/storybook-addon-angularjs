module.exports = {
  stories: ["../stories/**/*.stories.@(js|mdx)"],
  addons: [
    "@storybook/addon-storysource",
    "@storybook/addon-knobs",
    "@storybook/addon-controls",
    "@storybook/addon-actions",
    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true,
      },
    },
  ],
};
