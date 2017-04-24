;
(function() {
    angular
        .module('classicevents')
        .config(appConfig);

    function appConfig($stateProvider, $urlRouterProvider, appConstants) {
        $urlRouterProvider.otherwise('/');
    }

    angular
        .module('classicevents')
        .config(['$locationProvider', function($locationProvider) {
            $locationProvider.hashPrefix('');
        }]);

})();
