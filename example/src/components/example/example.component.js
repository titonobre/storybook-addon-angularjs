const componentName = "exampleComponent";

const component = {
  template: /* HTML */ `
    <style>
      h2 + div,
      h2 + ul {
        background-color: #ddd;
        padding: 1em;
        cursor: pointer;
      }
    </style>

    <h1>Example Component</h1>

    <h2>Injected Service</h2>
    <div ng-click="$ctrl.clickSection('service')">{{$ctrl.appService.message}}</div>

    <h2>Value</h2>
    <div ng-click="$ctrl.clickSection('value')">{{$ctrl.value}}</div>

    <h2>Iterpolated String</h2>
    <div ng-click="$ctrl.clickSection('interpolated-string')">{{$ctrl.string}}</div>

    <h2>Transcluded Slot A</h2>
    <div ng-transclude="slotA" ng-click="$ctrl.clickSection('slot-a')"></div>

    <h2>Transcluded Slot B</h2>
    <div ng-transclude="slotB" ng-click="$ctrl.clickSection('slot-b')"></div>
  `,
  bindings: {
    value: "<",
    string: "@",
    items: "<",
    onClick: "&",
  },
  transclude: {
    slotA: "?slotA",
    slotB: "?slotB",
  },
  controller: class {
    static $inject = ["AppService"];

    constructor(appService) {
      this.appService = appService;
    }

    $onInit() {
      console.log("[ExampleComponent] $onInit");
    }

    $onChanges(changes) {
      console.log("[ExampleComponent] $onChanges", changes);
    }

    clickSection(section) {
      console.log("[ExampleComponent] onClick in section", section);
      this.onClick({ section });
    }
  },
};

export default [componentName, component];
