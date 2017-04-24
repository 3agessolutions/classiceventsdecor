;
(function() {
    angular
        .module('classicevents')
        .directive('ceAbout', ceAbout)
        .controller('CEAboutController', CEAboutController);

    function ceAbout() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'source/js/components/about/about.html',
            controller: CEAboutController,
            controllerAs: 'about',
            bindToController: true
        };
    }

    function CEAboutController($state) {

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
