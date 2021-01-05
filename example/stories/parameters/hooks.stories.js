import { html, withAngularJs } from "storybook-addon-angularjs";

import myApp from "../../src/app.module";

export default {
  title: "Parameters/hooks",
  decorators: [withAngularJs],
  parameters: {
    ng: {
      module: myApp.name,
    },
  },
};

/**
 * Example with the parameter `rebuild` is ommited. This is the default behaviour.
 */
export const Default = ({ content }) => html`<quote-card>{{${content}}}</quote-card>`;

Default.args = {
  content: "This story has two hooks. Check the console log.",
};

Default.parameters = {
  ng: {
    hooks: {
      beforeCompile(AppService) {
        // called once before compiling the the component
        console.log("[Story Hook] beforeCompile");

        // this hook is called by the AngularJS injector, so you can get instances of your services
        console.log("[Story Hook] AppService message:", AppService.message);
      },
      beforeUpdate(AppService) {
        // called before updating the component with new props
        console.log("[Story Hook] beforeUpdate");

        // this hook is called by the AngularJS injector, so you can get instances of your services
        console.log("[Story Hook] AppService message:", AppService.message);
      },
    },
  },
};
