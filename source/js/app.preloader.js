(function() {
    angular
        .module('classicevents')
        .factory(
            'preloader',
            function($q, $rootScope) {
                function Preloader(imageLocations) {
                    this.imageLocations = imageLocations;

                    this.imageCount = this.imageLocations.length;
                    this.loadCount = 0;
                    this.errorCount = 0;
                    this.states = {
                        PENDING: 1,
                        LOADING: 2,
                        RESOLVED: 3,
                        REJECTED: 4
                    };
                    this.state = this.states.PENDING;

                    this.deferred = $q.defer();
                    this.promise = this.deferred.promise;
                }

                Preloader.preloadImages = function(imageLocations) {
                    var preloader = new Preloader(imageLocations);
                    return (preloader.load());
                };

                Preloader.prototype = {
                    constructor: Preloader,

                    isInitiated: function isInitiated() {
                        return (this.state !== this.states.PENDING);
                    },
                    isRejected: function isRejected() {
                        return (this.state === this.states.REJECTED);
                    },
                    isResolved: function isResolved() {
                        return (this.state === this.states.RESOLVED);
                    },
                    load: function load() {
                        if (this.isInitiated()) {
                            return (this.promise);
                        }
                        this.state = this.states.LOADING;
                        for (var i = 0; i < this.imageCount; i++) {
                            this.loadImageLocation(this.imageLocations[i]);
                        }
                        // Return the deferred promise for the load event.
                        return (this.promise);
                    },

                    handleImageError: function handleImageError(imageLocation) {
                        this.errorCount++;
                        // If the preload action has already failed, ignore further action.
                        if (this.isRejected()) {
                            return;
                        }
                        this.state = this.states.REJECTED;
                        this.deferred.reject(imageLocation);
                    },
                    handleImageLoad: function handleImageLoad(imageLocation) {
                        this.loadCount++;
                        if (this.isRejected()) {
                            return;
                        }

                        this.deferred.notify({
                            percent: Math.ceil(this.loadCount / this.imageCount * 100),
                            imageLocation: imageLocation
                        });

                        if (this.loadCount === this.imageCount) {
                            this.state = this.states.RESOLVED;
                            this.deferred.resolve(this.imageLocations);
                        }
                    },

                    loadImageLocation: function loadImageLocation(imageLocation) {
                        var preloader = this;

                        var image = angular.element(new Image())
                            .bind('load', function(event) {
                                // Since the load event is asynchronous, we have to
                                // tell AngularJS that something changed.
                                $rootScope.$apply(
                                    function() {
                                        preloader.handleImageLoad(event.target.src);
                                        // Clean up object reference to help with the
                                        // garbage collection in the closure.
                                        preloader = image = event = null;
                                    }
                                );
                            })
                            .bind('error', function(event) {
                                // Since the load event is asynchronous, we have to
                                // tell AngularJS that something changed.
                                $rootScope.$apply(
                                    function() {
                                        preloader.handleImageError(event.target.src);
                                        // Clean up object reference to help with the
                                        // garbage collection in the closure.
                                        preloader = image = event = null;
                                    }
                                );
                            })
                            .attr('src', imageLocation);
                    }
                };
                // Return the factory instance.
                return (Preloader);
            }
        );



})();
