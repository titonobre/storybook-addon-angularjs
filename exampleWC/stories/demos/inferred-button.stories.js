import { wc, withAngularJs } from "storybook-addon-angularjs";

import myApp from "../../app/app.module";

const component = "btn";

export default {
  title: "Demos/Inferred controls",
  decorators: [withAngularJs],
  parameters: {
    ng: {
      module: myApp.name,
    },
  },
  component,
};

const Template = (args) => {
  return wc(component, args);
};

export const InferredButton = Template.bind({});

export const InferredButtonWithArgs = Template.bind({});

InferredButtonWithArgs.args = {
  content: "default!",
};
