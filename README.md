# Storybook Addon for AngularJS

> **Note**  
> This is under active development. A first stable release is expected in the near future.

## Usage 

Install the package:
```bash
npm i -D storybook-addon-angularjs
```

Create your stories with:

```js
import { forModule } from "storybook-addon-angularjs";

const myApp = forModule("myApp");

const demoComponent = myApp.createElement(
  `<demo-component foo="foo"></demo-component>`
);

storiesOf("AngularJS", module)
  .addDecorator(withKnobs)
  .add("demo-component", () => {
    const foo = text("Foo", "Bar");

    return myApp.updateElement(demoComponent, { foo });
  })
```

See a full working example [here](https://github.com/titonobre/storybook-addon-angularjs-example).