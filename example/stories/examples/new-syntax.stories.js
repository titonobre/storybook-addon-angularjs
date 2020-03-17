import { withKnobs, text, number, array } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import { template as html, withAngularJs } from "storybook-addon-angularjs";

export default {
  title: "New Syntax",
  decorators: [withKnobs]
};

/**
 * Story with the tagged template string and some knobs to show different usage examples.
 */
export const example1 = () => {
  const aValue = text("Value", "Some text here!");
  const aString = text("String", "This string will be interpolated...");

  const slotA = text("Slot A", "This will be transcluded into the component");

  const onClick = action("onClick");

  return html`
    <example-component
      value="${aValue}"
      string="{{${aString}}}"
      on-click="${onClick}(section)"
    >
      <slot-a>{{${slotA}}}</slot-a>
      <slot-b>
        <code>foo()</code>
      </slot-b>
    </example-component>
  `;
};

example1.story = {
  // adding the decorator with its options passed on the parameters parameters
  decorators: [withAngularJs],
  parameters: {
    ng: {
      module: "myApp",
      hooks: {
        beforeCompile() {
          // called once before compiling the the component
          console.log("[Story Hook] beforeCompile");
        },
        beforeUpdate(AppService) {
          // called before updating the component with new props
          console.log("[Story Hook] beforeUpdate, updating AppService message");

          AppService.message = "Ahoy!";
        }
      }
    }
  }
};

/**
 * Story with template and props format.
 */
export const example2 = () => ({
  template: `
    <example-component
      value="aValue"
      string="{{aString}}"
      on-click="onClick(section)"
    >
      <slot-a>{{slotA}}</slot-a>
      <slot-b>
        <code>foo()</code>
      </slot-b>
    </example-component>
  `,
  props: {
    aValue: "Some text here!",
    aString: "This string will be interpolated...",
    onClick: action("onClick"),
    slotA: "This will be transcluded into the component"
  }
});

example2.story = {
  // adding the decorator with module name only
  decorators: [withAngularJs("myApp")]
};
