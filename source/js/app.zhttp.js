(function() {
    angular.module('classicevents')
        .factory('httpUtil', function($q, $resource) {

          var service = {};
          service.get = get;
          service.post = post;

          return service;


          function get(url, opts) {
            var defer = $q.defer();

            var req = $resource(url);

            opts = opts || {};

            var resp = req.get(opts, function(){
              defer.resolve(resp);
            }, function(){
              defer.resolve(resp);
            });

            return defer.promise;
          }

          function post(url, opts, postBody) {
            var defer = $q.defer();

            var req = $resource(url);

            opts = opts || {};

            var resp = req.save(opts, function(){
              defer.resolve(resp);
            }, function(){
              defer.resolve(resp);
            });

            return defer.promise;
          }

        });
})();
