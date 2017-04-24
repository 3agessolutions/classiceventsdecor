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

    function CEHeaderController($state, $location, $anchorScroll) {

        var vm = this;

        vm.imageLoaded = false;
        vm.goTo = goTo;

        initialize();

        function initialize() {

        }

        function goTo(title) {
          $location.hash(title);
          $anchorScroll();
        }

    }
})();
