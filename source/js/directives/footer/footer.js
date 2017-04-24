;
(function() {
    angular
        .module('classicevents')
        .directive('ceFooter', ceFooter)
        .controller('CEFooterController', CEFooterController);

    function ceFooter() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'source/js/directives/footer/footer.html',
            controller: CEFooterController,
            controllerAs: 'footer',
            bindToController: true
        };
    }

    function CEFooterController($state) {

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
