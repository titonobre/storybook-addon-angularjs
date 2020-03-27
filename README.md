# Storybook Addon for AngularJS (1.x)

[![npm](https://img.shields.io/npm/v/storybook-addon-angularjs.svg)](https://www.npmjs.com/package/storybook-addon-angularjs)
[![npm](https://img.shields.io/npm/dt/storybook-addon-angularjs.svg)](https://www.npmjs.com/package/storybook-addon-angularjs)
[![GitHub issues](https://img.shields.io/github/issues/titonobre/storybook-addon-angularjs.svg)](https://github.com/titonobre/storybook-addon-angularjs/issues)
[![GitHub](https://img.shields.io/github/license/titonobre/storybook-addon-angularjs.svg)](https://github.com/titonobre/storybook-addon-angularjs/blob/master/LICENSE)
[![Storybook](https://img.shields.io/badge/storybook-4%2B-ff4785.svg)](https://storybook.js.org/)

> **Note**
> This addon is intended to be used with `@storybook/html`, available since Storybook 4.

## Installation

Use your favorite 📦 package manager to install the addon in your project's `devDependencies`:

**npm:**

```sh
npm install --save-dev storybook-addon-angularjs
```

**Yarn:**

```sh
yarn add --dev storybook-addon-angularjs
```

## Usage

This addon is flexible enough to let you choose how you want to write stories.

Your stories can be as simple as this:

```js
export default {
  title: "QuoteCard",
  decorators: [withAngularJs("myApp")],
};

export const simpleTemplate = () => `
  <quote-card author="'Me'">
    It works with a simple template!
  </quote-card>
`;
```

But you may choose something more advanced:

```js
import { withKnobs, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import { template as html, withAngularJs } from "storybook-addon-angularjs";

export default {
  title: "QuoteCard",
  decorators: [withKnobs, withAngularJs],
  parameters: {
    ng: {
      module: "myApp",
      hooks: {
        beforeCompile() {
          // called once before compiling the the component
        },
        beforeUpdate(SomeService) {
          // called before updating the component with new props
          SomeService.setValue("Hi!");
        },
      },
    },
  },
};

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
```

You can even write stories with Markdown files, with the support for the [MDX Story Format](https://storybook.js.org/docs/formats/mdx-syntax/). This is awesome for writing documentation for your components.

```md
import { Meta, Story, Preview } from "@storybook/addon-docs/blocks";

import { withAngularJs } from "storybook-addon-angularjs";

<Meta title="Demos|MDX Demos" decorators={[withAngularJs("myApp")]} />

# Storybook Addon for AngularJS

This is a simple Quote Card:

<Preview>
  <Story name="Simple Template" height="120px">
    {`
      <quote-card author="'Me'">
        It works with a simple template!
      </quote-card>
    `}
  </Story>
</Preview>
```

See these and more examples in the [example subfolder](./example).

## API

### `withAngularJs(module?: string | string[])`

Storybook decorator. Can optionally be used to initialize the module(s) used within the story.

## License

Use of this source code is governed by an MIT-style license that can be found in the [LICENSE](LICENSE) file.
