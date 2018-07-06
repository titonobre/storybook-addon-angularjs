const componentName = "demoComponent";

const component = {
  template: `
      <h1>It works {{$ctrl.name}}</h1>
      <div>{{$ctrl.foo.bar}}</div>
      <button ng-click=$ctrl.onClick()>Hit Me!</button>
    `,
  bindings: {
    name: "<",
    foo: "<",
    onEv: "&"
  },
  controller: class {
    $onInit() {
      console.log("$onInit");
    }

    $onChanges(changes) {
      console.log("$onChanges", changes);
    }

    onClick() {
      console.log("onClick", this);
      this.onEv({ num: this.foo.bar, name: this.name });
    }
  }
};

export default [componentName, component];
