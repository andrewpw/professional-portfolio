(function() {
  'use strict';

  angular
    .module('portfolio')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: "/",
        templateUrl: "components/home/home.html",
        controllerAs: "HomeController"
      })
    ;

    $urlRouterProvider.otherwise('/');
  }
})();


