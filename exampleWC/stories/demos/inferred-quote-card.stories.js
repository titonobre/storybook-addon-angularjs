import { wc, withAngularJs } from "storybook-addon-angularjs";

import myApp from "../../app/app.module";

export default {
  title: "Demos/Inferred Quote Card",
  decorators: [withAngularJs],
  parameters: {
    ng: {
      module: myApp.name,
    },
  },
  component: "quote-card",
};

const Template = (args) => {
  return wc("quote-card", args);
};

export const InferredQuote = Template.bind();
