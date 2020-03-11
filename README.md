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
Create your stories with:

```js
import { storiesOf } from "@storybook/html";

import { withKnobs, text, number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import { forModule } from "storybook-addon-angularjs";

storiesOf("Components/Demo", module)
  .addDecorator(withKnobs)
  .add(
    "default",
    forModule("myApp").createElement(compile => {
      const name = text("Name", "Jane");

      const foo = {
        bar: number("Value", 20, { range: true, min: 0, max: 30, step: 1 })
      };

      const onEvt = action("clicked");

      return compile`<demo-component name="${name}" foo="${foo}" on-ev="${onEvt}(num, name)"></demo-component>`;
    })
  );
```

See a full working example [here](https://github.com/titonobre/storybook-addon-angularjs-example).

## License

Use of this source code is governed by an MIT-style license that can be found in the [LICENSE](LICENSE) file.
