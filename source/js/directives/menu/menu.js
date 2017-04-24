;
(function() {
    angular
        .module('classicevents')
        .directive('ceMenu', ceMenu)
        .controller('CEMenuController', CEMenuController);

    function ceMenu() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'source/js/directives/menu/menu.html',
            controller: CEMenuController,
            controllerAs: 'menu',
            bindToController: true
        };
    }

    function CEMenuController($state) {

        var vm = this;

        vm.imageLoaded = false;

        vm.stateChange = stateChange;


        initialize();

        function initialize() {

        }

        function process() {

        }

        function stateChange(type) {

        }

    }
})();
