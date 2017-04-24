;
(function() {
    angular
        .module('classicevents')
        .directive('ceBanner', ceBanner)
        .controller('CEBannerController', CEBannerController);

    function ceBanner() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'source/js/directives/banner/banner.html',
            controller: CEBannerController,
            controllerAs: 'banner',
            bindToController: true
        };
    }

    function CEBannerController($state) {

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
