;
(function() {
    angular
        .module('classicevents')
        .config(ceConfig);

    function ceConfig($stateProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                template: '<ce-home></ce-home>',
                params: {
                    model: null
                }
            });
    }

})();
