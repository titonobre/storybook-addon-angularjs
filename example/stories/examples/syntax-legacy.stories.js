import { withKnobs, text, number, array } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import { forModule } from "storybook-addon-angularjs";

import myApp from "../../src/app.module";

export default {
  title: "Syntax/Legacy",
  decorators: [withKnobs],
};

/**
 * The usage of `forModule` is now depreated. Please use the new decorator.
 */
export const Demo = forModule(myApp.name).createElement((compile) => {
  const name = text("Name", "Jane");
  const someString = text("Some String", "It works too!");

  const foo = {
    bar: number("Value", 20, { range: true, min: 0, max: 30, step: 1 }),
  };

  const things = array("Things", ["a", "b", "c"], ",");

  const onEvt = action("clicked");

  return compile/* HTML */ `<demo-component
    name="${name}"
    some-string="{{${someString}}}"
    foo="${foo}"
    things="${things}"
    on-event="${onEvt}(item)"
  ></demo-component>`;
});
