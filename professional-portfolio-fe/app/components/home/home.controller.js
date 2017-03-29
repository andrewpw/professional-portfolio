(function () {
  'use strict';

  angular
    .module('portfolio')
    .controller('HomeController', HomeController);

  function HomeController($scope, $state) {

    console.log("here");

    $scope.goToJourney = function() {
      console.log("hey I did stuff");
      $state.go('journey');
    };
  }
})();