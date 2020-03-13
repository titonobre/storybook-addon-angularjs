import angular from "angular";

import demoComponent from "./demo.component";

const MyAppModule = angular
  .module("myApp", [])
  .component(...demoComponent);

export { MyAppModule };
