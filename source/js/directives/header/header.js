;
(function() {
  angular
    .module('classicevents')
    .directive('ceHeader', ceHeader)
    .controller('CEHeaderController', CEHeaderController);

  function ceHeader() {
    return {
      restrict: 'E',
      replace: true,
      scope: {},
      templateUrl: 'source/js/directives/header/header.html',
      controller: CEHeaderController,
      controllerAs: 'header',
      bindToController: true
    };
  }

  function CEHeaderController($state, $location, $document) {

    var vm = this;

    vm.imageLoaded = false;
    vm.goTo = goTo;

    initialize();

    function initialize() {

    }

    function goTo(title, $event) {
      $event.preventDefault();
      var section = document.getElementById(title);
      var header = document.getElementById('classic-header');
      var pos = section.offsetTop - header.offsetHeight;
      $document.scrollTop(pos, 800);

    }

  }
})();
