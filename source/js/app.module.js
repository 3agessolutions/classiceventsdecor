(function() {
    angular.module('classicevents', ["ngResource", "ui.router", "ngFileUpload", "duScroll"]);
    angular.module('classicevents')
        .config(function($compileProvider) {
            $compileProvider.preAssignBindingsEnabled(true);
        }).config(['$resourceProvider', function($resourceProvider) {
            $resourceProvider.defaults.stripTrailingSlashes = false;
        }]).config(['$httpProvider', function($httpProvider){
          $httpProvider.defaults.headers.common['csrftoken'] = 'dfdkfjdkfj3434343kj';
        }]);
})();
