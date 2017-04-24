;
(function() {
    angular
        .module('classicevents')
        .directive('ceTestimonials', ceTestimonials)
        .controller('CETestimonialsController', CETestimonialsController);

    function ceTestimonials() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'source/js/components/testimonials/testimonials.html',
            controller: CETestimonialsController,
            controllerAs: 'home',
            bindToController: true
        };
    }

    function CETestimonialsController($state, preloader, appConstants) {

        var vm = this;
        initialize();
        function initialize() {

        }
    }
})();
