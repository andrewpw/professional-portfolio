(function () {
  'use strict';

  angular
    .module('portfolio')
    .controller('JourneyController', JourneyController);

  function JourneyController($scope) {
    console.log("journey controller");
  }
})();