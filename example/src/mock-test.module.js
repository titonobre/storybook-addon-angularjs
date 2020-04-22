// ! This module is not able to live on it's own because it's dependencies does not exist !
// ---
// The module is used for testing the mocking capability of the storybook plugin so it
// relies the following things which must be mocked:
// - module (some.external.module)
// - service
// - factory
// - constant
import angular from "angular";

import myApp from "./app.module";

export default angular.module("myApp.mockTest", [myApp.name, "some.external.module"]).component("mockTest", {
  template: /* HTML */ `
    <h1>Mock Test Component</h1>
    <h2>Mocked Service</h2>
    <div>
      <button ng-click="$ctrl.mockedService.increaseCounter()">Increase Count</button>
      <div>{{$ctrl.mockedService.counter}}</div>
    </div>

    <h2>Mocked Service (from factory)</h2>
    <div>
      <button ng-click="$ctrl.mockedServiceFromFactory.increaseCounter()">Increase Count</button>
      <div>{{$ctrl.mockedServiceFromFactory.counter}}</div>
    </div>

    <h2>Mocked Constant</h2>
    <pre ng-bind="$ctrl.MOCKED_CONSTANT"></pre>
  `,

  controller: class {
    static $inject = ["MockedService", "MockedServiceFromFactory", "MOCKED_CONSTANT"];

    constructor(mockedService, mockedServiceFromFactory, MOCKED_CONSTANT) {
      this.mockedService = mockedService;
      this.mockedServiceFromFactory = mockedServiceFromFactory;
      this.MOCKED_CONSTANT = MOCKED_CONSTANT;
    }
  },
});
