import { storiesOf } from "@storybook/html";

import { withKnobs, text, number, array } from "@storybook/addon-knobs";
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

storiesOf("Components/Other", module)
  .addDecorator(withKnobs)
  .add(
    "default",
    forModule("myApp").createElement(compile => {
      const title = text("Title", "Some Title");

      const things = array("Things", ["a", "b", "c"], ",");

      const onHit = action("hit");

      return compile`<other-component title="${title}" things="${things}" on-hit="${onHit}(item)"></other-component>`;
    })
  );
