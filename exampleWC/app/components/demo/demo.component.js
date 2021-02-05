const componentName = "demoComponent";

const component = {
  template: /* HTML */ `
    <h1>It works {{$ctrl.name}}</h1>
    <div>{{$ctrl.someString}}</div>
    <div>{{$ctrl.foo.bar}}</div>
    <ul>
      <li ng-repeat="item in $ctrl.things">
        <button ng-click="$ctrl.onClick(item)">{{item}}</button>
      </li>
    </ul>
  `,
  bindings: {
    name: "<",
    someString: "@",
    foo: "<",
    things: "<",
    onEvent: "&",
  },
  controller: class {
    $onInit() {
      console.log("[Demo Component] $onInit");
    }

    $onChanges(changes) {
      console.log("[Demo Component] $onChanges", changes);
    }

    onClick(item) {
      console.log("[Demo Component] onClick", item);
      this.onEvent({ item });
    }
  },
};

export default [componentName, component];
