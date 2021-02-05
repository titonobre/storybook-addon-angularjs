import angular from "angular";

/**
 * Compiles the given template with the given props into the given element.
 *
 * @param {HTMLElement} element the root element to compile
 * @param {string} template the new HTML to compile
 * @param {any} props the props to inject in the scope
 * @param {Object} hooks hooks
 * @param {Function} hooks.beforeCompile injectable function to invoke before the compiler
 */
export function buildElement(element, template, props = {}, hooks) {
  const $element = angular.element(element);
  const $injector = $element.injector();

  if (hooks && typeof hooks.beforeCompile === "function") {
    $injector.invoke(hooks.beforeCompile);
  }

  const compiler = function ($compile, $rootScope) {
    // get the scope of the target, use the rootScope if it does not exists
    const $scope = $element.scope() || $rootScope;

    // compile the new template and link it with the updated scope
    $compile($element.html(template))(Object.assign($scope, props));

    $rootScope.$digest();
  };

  compiler.$inject = ["$compile", "$rootScope"];

  $injector.invoke(compiler);

  return element;
}

/**
 * Updates the given element with the given props.
 *
 * @param {HTMLElement} element the root element to update
 * @param {any} props the new props to inject in the scope
 * @param {Object} hooks hooks
 * @param {Function} hooks.beforeUpdate an injectable function to invoke before the update
 */
export function updateElement(element, props = {}, hooks) {
  const $element = angular.element(element);
  const $injector = $element.injector();

  if (hooks && typeof hooks.beforeUpdate === "function") {
    $injector.invoke(hooks.beforeUpdate);
  }

  const updater = function ($rootScope) {
    const $scope = $element.scope();

    Object.assign($scope, props);

    $scope.$digest();
    $rootScope.$digest();
  };

  updater.$inject = ["$rootScope"];

  $injector.invoke(updater);

  return element;
}

/**
 * Template Literal tag function to process the AngularJS templates.
 *
 * @param {string[]} strings template literal’s string chunks
 * @param {any[]} values interpolated expressions
 */
export function processTemplate(strings, ...values) {
  return strings.reduce(
    (acc, str, i) => {
      const prop = i < values.length ? "_prop" + i : "";

      acc.template += str + prop;

      if (i < values.length) {
        acc.props[prop] = values[i];
      }

      return acc;
    },
    { template: "", props: {} }
  );
}

/**
 * Function to process and generate an AngularJS template based on the component name and a given set of bindings
 *
 * @param {string} componentName the tag name of the component
 * @param {any} bindings the component's bindings
 */
export function processWC(componentName, bindings) {
  const bindingsTemplate = Object.entries(bindings)
    .map(([argName, value], i) => {
      if (typeof value === "function") {
        return `${argName}="_prop${i}($locals)"`;
      }
      return `${argName}="_prop${i}"`;
    })
    .join(" ");

  const template = `<${componentName} ${bindingsTemplate}></${componentName}>`;
  const props = Object.fromEntries(Object.values(bindings).map((arg, i) => [`_prop${i}`, arg]));

  return { template, props };
}

/**
 * @param {string} moduleName the angular module name
 * @deprecated use the new decorator
 */
export function forModule(moduleName) {
  return {
    /**
     * Given a function to provide the template, it provides a function to create and update a DOM element.
     *
     * @param {Function} builder a function to provide the template and the props
     * @param {Function} hook an injectable function to invoke before creating and updating
     * @returns {Function} a function to create and update the element
     * @deprecated use the new decorator
     */
    createElement(builder, hook) {
      const hooks = { beforeCompile: hook };

      let oldTemplate;
      let element;

      return () => {
        const { template, props } = builder(processTemplate);

        if (!element || template !== oldTemplate) {
          oldTemplate = template;
          element = document.createElement("div");

          angular.bootstrap(element, [moduleName]);

          return buildElement(element, template, props, hooks);
        }

        return updateElement(element, props, hooks);
      };
    },
  };
}
