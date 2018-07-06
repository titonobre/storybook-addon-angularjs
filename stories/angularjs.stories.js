import { storiesOf } from "@storybook/html";

import { withKnobs, text, number, array } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import { forModule } from "storybook-addon-angularjs";

const myApp = forModule("myApp");

const demoComponent = myApp.createElement(
  `<demo-component name="name" foo="foo" on-ev="onEvt(num, name)"></demo-component>`
);

const otherComponent = myApp.createElement(
  `<other-component title="title" things="things" on-hit="onHit(item)"></other-component>`
);

storiesOf("AngularJS", module)
  .addDecorator(withKnobs)
  .add("demo-component", () => {
    const name = text("Name", "Jane");

    const value = number("Value", 20, {
      range: true,
      min: 0,
      max: 30,
      step: 1
    });

    const foo = { bar: value };

    const onEvt = action("clicked");

    return myApp.updateElement(demoComponent, { name, foo, onEvt });
  })
  .add("other-component", () => {
    const title = text("Title", "Some Title");

    const things = array("Things", ["a", "b", "c"], ",");

    const onHit = action("hit");

    return myApp.updateElement(otherComponent, { title, things, onHit });
  });
