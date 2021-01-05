import { html, withAngularJs } from "storybook-addon-angularjs";

import myApp from "../../src/app.module";

export default {
  title: "Parameters/rebuild",
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
  content: "This story is built once and cached. The story is only rebuilt if its template changes.",
};

/**
 * Example with `rebuild: "always"`.
 */
export const Always = ({ content }) => html`<quote-card>{{${content}}}</quote-card>`;

Always.args = {
  content: "This story is built when is mounted or its args change.",
};

Always.parameters = {
  ng: {
    rebuild: "always",
  },
};

/**
 * Example with `rebuild: "mount"`.
 */
export const Mount = ({ content }) => html`<quote-card>{{${content}}}</quote-card>`;

Mount.args = {
  content: "This story is built when is mounted.",
};

Mount.parameters = {
  ng: {
    rebuild: "mount",
  },
};

/**
 * Example with `rebuild: "update"`.
 */
export const Update = ({ content }) => html`<quote-card>{{${content}}}</quote-card>`;

Update.args = {
  content: "This story is built when its args change.",
};

Update.parameters = {
  ng: {
    rebuild: "update",
  },
};
