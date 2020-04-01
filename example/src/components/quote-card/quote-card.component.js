import "./quote-card.css";

const componentName = "quoteCard";

const component = {
  template: /* HTML */ `
    <blockquote class="card" ng-click="$ctrl.onClick({foo:'bar'})">
      <p class="content" ng-transclude></p>
      <cite>
        {{$ctrl.author}}
      </cite>
    </blockquote>
  `,
  bindings: {
    content: "<",
    author: "<",
    onClick: "&",
  },
  transclude: true,
  controller: class {
    $onInit() {
      console.log("[Quote Card] $onInit");
    }

    $onChanges(changes) {
      console.log("[Quote Card] $onChanges", changes);
    }
  },
};

export default [componentName, component];
