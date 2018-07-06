import angular from "angular";

/**
 * Compiles the given template with the given scope into the given element.
 *
 * @param {HTMLElement} element the root element to compile
 * @param {string} moduleName the name of the module
 * @param {string} template the new HTML to compile
 * @param {any} newScope the new scope
 */
function compile(moduleName, element, template, newScope = {}) {
  const $injector = angular.injector(["ng", moduleName]);
  const $element = angular.element(element);

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
function update(moduleName, element, newScope) {
  const $injector = angular.injector(["ng", moduleName]);
  const $element = angular.element(element);

  const updater = function($rootScope) {
    const $scope = $element.scope();

    Object.assign($scope, newScope);

    $scope.$digest();
    $rootScope.$digest();
  };

  updater.$inject = ["$rootScope"];

  $injector.invoke(updater);
}

export function forModule(moduleName) {
  return {
    /**
     * Creates an new element with the given template and the given scope.
     *
     * @param {string} template the new template
     * @param {any} scope the scope for the new element
     */
    createElement(template, scope = {}) {
      const element = document.createElement("div");

      compile(moduleName, element, template, scope);

      return element;
    },

    /**
     * Updates the given element with the given scope.
     * @param {HTMLElement} element the element to update
     * @param {any} scope the new scope
     */
    updateElement(element, scope = {}) {
      update(moduleName, element, scope);

      return element;
    }
  };
}
