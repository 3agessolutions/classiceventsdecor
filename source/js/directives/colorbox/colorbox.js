;
(function() {
    angular
        .module('classicevents')
        .directive('ceColorbox', ceColorbox);

    function ceColorbox(colorBox) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
              var cb = colorBox.getInstance();
              cb.init(scope, element, attrs);
            }
        };
    }
})();
