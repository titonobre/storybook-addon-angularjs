import { withKnobs, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import { template as html, withAngularJs } from "storybook-addon-angularjs";

export default {
  title: "Demos|CSF Demos",
  decorators: [withKnobs, withAngularJs("myApp")],
};

export const simpleTemplate = () => `
  <quote-card author="'Me'">
    It works with a simple template!
  </quote-card>
`;

export const templateAndProps = () => ({
  template: `
    <quote-card author="author">
      {{content}}
    </quote-card>
  `,
  props: {
    content: "It works with template and props!",
    author: "Me",
  },
});

export const knobsAndActions = () => ({
  template: `
    <quote-card author="author" on-click="onEvt(foo)">
      {{content}}
    </quote-card>
  `,
  props: {
    content: text("Content", "It works with Knobs and Actions!"),
    author: text("Author", "Me"),
    onEvt: action("clicked"),
  },
});

export const fancyTemplate = () => {
  const content = text("Content", "It works with a fancy tagged template string!");
  const author = text("Author", "Me");
  const onEvt = action("clicked");

  return html`
    <quote-card author="${author}" on-click="${onEvt}(foo)">
      {{${content}}}
    </quote-card>
  `;
};
