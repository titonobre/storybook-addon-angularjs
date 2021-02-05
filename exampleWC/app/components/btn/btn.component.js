import "./btn.css";

const componentName = "btn";

const component = {
  template: /* HTML */ `
    <button
      class="btn btn--{{$ctrl.size}}"
      ng-disabled="$ctrl.isDisabled"
      ng-click="$ctrl.onClick({ foo: 'bar', $event})"
    >
      {{$ctrl.content}}
    </button>
  `,
  bindings: {
    content: "<",
    isDisabled: "<",
    size: "<",
    onClick: "&",
  },
  controller: class {
    $onInit() {
      console.log("[btn] $onInit");
      if (!this.size) {
        this.size = "medium";
      }
    }

    $onChanges(changes) {
      console.log("[btn] $onChanges", changes);
    }
  },
};

export default [componentName, component];
