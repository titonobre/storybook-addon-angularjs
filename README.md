# Storybook Addon for AngularJS (1.x)

> **Note**
> This addon is intended to be used with `@storybook/html`, available since Storybook 4.

## Usage

Install the package:
```bash
npm i -D storybook-addon-angularjs
```

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
