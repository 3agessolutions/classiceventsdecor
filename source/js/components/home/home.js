;
(function() {
    angular
        .module('classicevents')
        .directive('ceHome', ceHome)
        .controller('CEHomeController', CEHomeController);

    function ceHome() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'source/js/components/home/home.html',
            controller: CEHomeController,
            controllerAs: 'home',
            bindToController: true
        };
    }

    function CEHomeController($state, preloader, appConstants) {

        var vm = this;

        vm.imageLoaded = false;

        vm.stateChange = stateChange;


        initialize();

        function initialize() {
          preloader
            .preloadImages(appConstants.imageLocations)
            .then(function() {
                process();
                vm.imageLoaded = true;
            },
            function() {
                process();
                vm.imageLoaded = true;
            });
        }

        function process() {

        }

        function stateChange(type) {

        }

    }
})();
