;
(function() {
  angular
    .module('classicevents')
    .directive('stickyHeader', stickyHeader);

  function stickyHeader($window, $document) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var $win = angular.element($window);
        var body = $document.find('body').eq(0);

        var cls = attrs.stickyHeader;
        var offsetTop = element[0].clientHeight;

        $win.on('scroll', function(e) {
          var pos = $win[0].scrollY;
          if (pos >= 1) {
            body.addClass(cls);
          } else {
            body.removeClass(cls);
          }
        });
      }
    };
  }
})();
