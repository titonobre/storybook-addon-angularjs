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

    const { module, hooks, mock, rebuild } =
      // withAngularJs("myApp") or withAngularJs(["myApp", "myOtherApp"])
      typeof storyOptions === "string" || Array.isArray(storyOptions)
        ? {
            module: storyOptions,
            hooks: undefined,
            mock: undefined,
            rebuild: false,
          }
        : {
            ...storyOptions,
            // If module is defined in parameters use it otherwise fallback to module from options
            module: parameters.module || options,
          };

    const story = getStory(context.args);

    const { template, props = {} } = typeof story === "string" ? { template: story } : story;

    const key = context.id;

    const currentPhase = context.hooks.currentPhase;

    if (
      rebuild === "always" ||
      (rebuild === "mount" && currentPhase === "MOUNT") ||
      (rebuild === "update" && currentPhase === "UPDATE") ||
      !cache[key] ||
      (cache[key].template !== template && !!template)
    ) {
      const modules = Array.isArray(module) ? module : [module];

      const element = document.createElement("div");

      // Initialize mocked modules
      if (mock && mock.modules) {
        mock.modules.forEach((moduleToMock) => {
          modules.unshift(angular.module(moduleToMock, []).name);
        });
      }

      // Initialize mocked providers for constants, services and factories
      // Since the providers of the last module overrides the ones of the previous modules
      // we append it to the end of the modules
      // https://stackoverflow.com/q/37094761/831465
      if (mock) {
        modules.push([
          "$provide",
          ($provide) => {
            // Constants
            angular.forEach(mock.constants, (mockedValue, key) => {
              $provide.constant(key, mockedValue);
            });

            // Services
            angular.forEach(mock.services, (mockedValue, key) => {
              $provide.service(key, mockedValue);
            });

            // Factories
            angular.forEach(mock.factories, (mockedValue, key) => {
              $provide.factory(key, mockedValue);
            });
          },
        ]);
      }

      angular.bootstrap(element, modules);

      cache[key] = { template, element };

      return buildElement(cache[key].element, template, props, hooks);
    }

    return updateElement(cache[key].element, props, hooks);
  },
});
