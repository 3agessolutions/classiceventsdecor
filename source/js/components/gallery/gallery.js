;
(function() {
    angular
        .module('classicevents')
        .directive('ceGallery', ceGallery)
        .controller('CEGalleryController', CEGalleryController);

    function ceGallery() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'source/js/components/gallery/gallery.html',
            controller: CEGalleryController,
            controllerAs: 'gallery',
            bindToController: true
        };
    }

    function CEGalleryController($state) {

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
