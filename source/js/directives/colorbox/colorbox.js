;
(function() {
    angular
        .module('classicevents')
        .directive('ceColorbox', ceColorbox);

    function ceColorbox() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
              var cb = new colorBox();
              cb.init(scope, element, attrs);
            }
        };
    }
})();
