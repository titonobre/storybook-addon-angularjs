import { withAngularJs } from "storybook-addon-angularjs";

import mockTestApp from "../../src/mock-test.module";

export default {
  title: "Parameters/mock",
};

/**
 * Story with template and service mock
 */
export const MockComponent = () => ({
  template: /* HTML */ ` <mock-test></mock-test> `,
});

class MockedService {
  constructor() {
    console.log("[MockedService] New Instance");
    this.counter = 0;
  }

  increaseCounter() {
    this.counter++;
  }
}

function MockedServiceFromFactory() {
  let counter = 0;

  return {
    get counter() {
      return counter;
    },
    increaseCounter: () => {
      return counter++;
    },
  };
}

MockComponent.decorators = [withAngularJs(mockTestApp.name)];

MockComponent.parameters = {
  ng: {
    mock: {
      // Add modules names which should be mocked
      modules: ["some.external.module"],
      // Services
      services: {
        MockedService,
      },
      factories: {
        MockedServiceFromFactory,
      },
      constants: {
        MOCKED_CONSTANT: "Mocked constant value",
      },
    },
  },
};
