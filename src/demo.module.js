import angular from "angular";

import demoComponent from "./demo.component";
import otherComponent from "./other.component";

const MyAppModule = angular
  .module("myApp", [])
  .component(...demoComponent)
  .component(...otherComponent);

export { MyAppModule };
