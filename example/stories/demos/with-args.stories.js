import { html, withAngularJs } from "storybook-addon-angularjs";

import myApp from "../../src/app.module";

export default {
  title: "Demos/CSF Demos 2",
  decorators: [withAngularJs],
  parameters: {
    ng: {
      module: myApp.name,
    },
  },
};

export const withArgs = ({ author, content, onEvt }) => html`
  <quote-card author="${author}" on-click="${onEvt}(foo)">{{${content}}}</quote-card>
`;

withArgs.args = {
  content: "It works with Storybook Args!",
  author: "Me",
};

withArgs.argTypes = {
  onEvt: { action: "clicked", table: { disable: true } },
};
