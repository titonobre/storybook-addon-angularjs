import addonAPI from "@storybook/addons";

addonAPI.register("my-organisation/angularjs", storybookAPI => {
  storybookAPI.onStory((kind, story) => {
    console.log(kind, story);
  });
});
