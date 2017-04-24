;
(function() {
    angular
        .module('classicevents')
        .directive('ceGalleryItem', ceGalleryItem)
        .controller('CEGalleryItemController', CEGalleryItemController);

    function ceGalleryItem() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'source/js/directives/gallery-item/gallery.item.html',
            controller: CEGalleryItemController,
            controllerAs: 'galleryItem',
            bindToController: true
        };
    }

    function CEGalleryItemController($state) {

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
