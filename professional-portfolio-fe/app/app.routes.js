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
        controller: "HomeController"
      })
      .state('journey', {
        url: "/journey",
        templateUrl: "components/journey/journey.html",
        controller: "JourneyController"
      })
    ;

    $urlRouterProvider.otherwise('/');
  }
})();


