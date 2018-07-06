const componentName = "otherComponent";

const component = {
  template: `
    <h1>{{$ctrl.title}}</h1>
    <ul>
      <li ng-repeat="item in $ctrl.things">
        <span>{{item}}</span>
        <button ng-click="$ctrl.onClick(item)">x</button>
      </li>
    </ul>
  `,
  bindings: {
    title: "<",
    things: "<",
    onHit: "&"
  },
  controller: class {
    $onInit() {
      console.log("$onInit");
    }

    $onChanges(changes) {
      console.log("$onChanges", changes);
    }

    onClick(item) {
      console.log("onHit", item);
      this.onHit({ item });
    }
  }
};

export default [componentName, component];
