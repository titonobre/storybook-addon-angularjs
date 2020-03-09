import angular from "angular";

/**
 * Compiles the given template with the given scope into the given element.
 *
 * @param {HTMLElement} element the root element to compile
 * @param {string} moduleName the name of the module
 * @param {string} template the new HTML to compile
 * @param {any} newScope the new scope
 */
function compile(
  moduleName,
  element,
  template,
  newScope = {},
  hook
) {
  const $injector = angular.injector(["ng", moduleName]);
  const $element = angular.element(element);

  if (hook) {
    if (typeof hook !== 'function') {
      throw "Hook must be function!";
    }
    $injector.invoke(hook);
  }

  const compiler = function($compile, $rootScope) {
    // get the scope of the target, use the rootScope if it does not exists
    const $scope = $element.scope() || $rootScope;

    // compile the new template and link it with the updated scope
    $compile($element.html(template))(Object.assign($scope, newScope));

    $rootScope.$digest();
  };

  compiler.$inject = ["$compile", "$rootScope"];

  $injector.invoke(compiler);
}

/**
 * Updates the given element with the given scope.
 *
 * @param {string} moduleName the name of the module
 * @param {HTMLElement} element the root element to update
 * @param {any} newScope the new scope
 */
function update(
  moduleName,
  element,
  newScope,
  hook
) {
  const $injector = angular.injector(["ng", moduleName]);
  const $element = angular.element(element);

  if (hook) {
    if (typeof hook !== 'function') {
      throw "Hook must be function!";
    }
    $injector.invoke(hook);
  }

  const updater = function($rootScope) {
    const $scope = $element.scope();

    Object.assign($scope, newScope);

    $scope.$digest();
    $rootScope.$digest();
  };

  updater.$inject = ["$rootScope"];

  $injector.invoke(updater);
}

/**
 * Creates an new element with the given template and the given scope.
 *
 * @param {string} moduleName the angularjs module
 * @param {string} template the new template
 * @param {any} scope the scope for the new element
 */
function createElement(
  moduleName,
  template,
  scope = {},
  hook
) {
  const element = document.createElement("div");

  compile(moduleName, element, template, scope, hook);

  return element;
}

/**
 * Updates the given element with the given scope.
 *
 * @param {string} moduleName the angularjs module
 * @param {HTMLElement} element the element to update
 * @param {any} scope the new scope
 */
function updateElement(
  moduleName,
  element,
  scope = {},
  hook
) {
  update(moduleName, element, scope, hook);

  return element;
}

/**
 * Template Literal tag function to process the AngularJS templates.
 *
 * @param {string[]} strings template literal’s string chunks
 * @param {any[]} values interpolated expressions
 */
function processTemplate(strings, ...values) {
  return strings.reduce(
    (acc, str, i) => {
      const prop = i < values.length ? "_prop" + i : "";

      acc.template += str + prop;

      if (i < values.length) {
        acc.scope[prop] = values[i];
      }

      return acc;
    },
    { template: "", scope: {} }
  );
}

export function forModule(moduleName) {
  return {
    /**
     * Given a function to provide the template, it provides a function to create and update a DOM element.
     *
     * @param {Function} builder a function to provide the scope
     * @returns {Function} a function to create and update the element
     */
    createElement(builder, hook) {
      let oldTemplate;
      let element;

      return () => {
        const { template, scope } = builder(processTemplate);

        if (!element || template !== oldTemplate) {
          oldTemplate = template;
          element = createElement(moduleName, template, scope, hook);
          return element;
        }

        return updateElement(moduleName, element, scope, hook);
      };
    }
  };
}
