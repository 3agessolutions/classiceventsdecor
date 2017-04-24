;
(function() {
    angular
        .module('classicevents')
        .directive('ceContact', ceContact)
        .controller('CEContactController', CEContactController);

    function ceContact() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'source/js/components/contact/contact.html',
            controller: CEContactController,
            controllerAs: 'contact',
            bindToController: true
        };
    }

    function CEContactController($state) {

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
