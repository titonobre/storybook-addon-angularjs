import angular from "angular";

import { makeDecorator } from "@storybook/addons";

import { buildElement, updateElement } from "./utils/angularjs";

const cache = {};

export default makeDecorator({
  name: "withAngularJs",
  parameterName: "ng",
  skipIfNoParametersOrOptions: true,

  wrapper: (getStory, context, { parameters, options }) => {
    const storyOptions = parameters || options;

    const { module, hooks } =
      typeof storyOptions === "string"
        ? {
            module: storyOptions,
            hooks: undefined
          }
        : storyOptions;

    const story = getStory();

    const { template, props = {} } =
      typeof story === "string" ? { template: story } : story;

    const key = context.id;

    if (!cache[key] || cache[key].template !== template) {
      const element = document.createElement("div");

      angular.bootstrap(element, [module]);

      cache[key] = { template, element };

      return buildElement(cache[key].element, template, props, hooks);
    }

    return updateElement(cache[key].element, props, hooks);
  }
});
