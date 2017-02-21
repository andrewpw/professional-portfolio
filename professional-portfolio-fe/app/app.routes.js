(function() {
  'use strict';

  angular
    .module('portfolio')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
      .state('home', {
        url: "/",
        templateUrl: "app/components/home/home.html",
        controllerAs: "HomeController"
      })
    ;

    $urlRouterProvider.otherwise('/');

    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
  }
})();


