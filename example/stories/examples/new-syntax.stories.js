import { withKnobs, text, number, array } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import { template as html, withAngularJs } from "storybook-addon-angularjs";

export default {
  title: "New Syntax",
  decorators: [withKnobs],
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
    <example-component value="${aValue}" string="{{${aString}}}" on-click="${onClick}(section)">
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
        },
      },
    },
  },
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
    slotA: "This will be transcluded into the component",
  },
});

example2.story = {
  // adding the decorator with module name only
  decorators: [withAngularJs("myApp")],
};

/**
 * Story with multiple modules.
 */
export const example3 = () => ({
  template: `
    <demo-component
      name="name"
      some-string="{{someString}}"
      foo="foo"
      things="things"
      on-event="onEvt(item)">
    </demo-component>
    <quote-card
      author="author"
      on-click="onEvt(foo)">
      {{content}}
    </quote-cardauthor="author">
  `,
  props: {
    content: text("Content", "It works with Knobs and Actions!", "quoteCard"),
    author: text("Author", "Me", "quoteCard"),
    things: array("Things", ["a", "b", "c"], ",", "DemoComponent"),
    foo: {
      bar: number("Value", 20, { range: true, min: 0, max: 30, step: 1 }, "DemoComponent"),
    },
    name: text("Name", "Jane", "DemoComponent"),
    someString: text("Some String", "It works too!", "DemoComponent"),
    onEvt: action("clicked"),
  },
});

example3.story = {
  // adding the decorator with module name only
  decorators: [withAngularJs(["myApp.components.demo", "myApp.components.quoteCard"])],
};
