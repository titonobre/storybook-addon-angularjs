import { setCustomElements } from "@storybook/web-components";
import customElements from "../app/custom-elements.json";

export const parameters = {
  actions: { argTypesRegex: "^on-[a-z].*" },
};

setCustomElements(customElements);
