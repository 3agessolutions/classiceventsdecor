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


;
(function() {
    angular
        .module('classicevents')
        .constant('appConstants', {

          'baseUrl': '/',
          'imageLocations': [
            'css/imgs/bg_pattern.jpg',
            'css/imgs/banner.jpg',
            'files/1.jpg',
            'files/2_t.jpg',
            'files/3_t.jpg',
            'files/5.jpg',
            'files/6.jpg',
            'files/7.jpg',
            'files/8.jpg',
            'files/9.jpg',
            'files/10.jpg',
            'files/11.jpg',
            'files/12_t.jpg',
            'files/13_t.jpg',
            'files/14.jpg',
            'files/15.jpg',
            'files/16.jpg',
            'files/17.jpg',
            'files/18.jpg',
            'files/19.jpg',
            'files/20.jpg',
            'files/21.jpg',
            'files/22.jpg'
          ]
        });


})();

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

angular.module('classicevents').run(['$templateCache', function($templateCache) {$templateCache.put('source/js/components/about/about.html','<div class="classic-events about" id="about">\n  <div class="wrapper">\n    <h2 class="title">About Us</h2>\n    <p>\n      We are premium decorators for all occasion happens with your family, we make your occasion colourful, joyful, and theme based elegant decors as per your dreams within your budget and our relationship starts here. </p>\n    <p>We do traditional, modern and contemporary styles of d\xE9cor as per your Occasion.</p>\n    <div>\n      <div class="about-block">\n        <h3>Why to call us</h3>\n        <p>Occasions come to celebrate our emotions and happiness, the beauty of happiness and emotions are displayed in the form of d\xE9cor which makes your dreams to be shared with your family.</p>\n        <p> Our team make your dreams come true with new different designs and unique style as to be a remembrance for every one of your special occasion.</p>\n      </div>\n      <div class="about-block">\n        <h3>Our Decor Services</h3>\n        <ul class="list-style">\n          <li>\n            <h4>Banquet halls in all Hotels and Resorts</h4>\n            <p>(Confluence, GRT, ITC, My Fortune, Taj Connemara, Taj Coromandal, Leela Palace, Hilton, Radisson blu, Hyatt, Crown Plaza, Feathers, Taj Fishcove, Turya, Trident, Westin etc\u2026.)</p>\n          </li>\n          <li>\n            <h4>All wedding halls</h4>\n            <p>(MRC Kalyana mandapam, Raja Muthiah, Rani Meyyammai etc\u2026)</p>\n          </li>\n          <li>\n            <h4>Outdoor lawns, Farm houses, houses</h4>\n            <p>(VGP, Royal palms, Green coconut resort, Shelter beach resort etc\u2026)</p>\n          </li>\n        </ul>\n\n      </div>\n      <div class="about-block last-block">\n        <h3>What all we do</h3>\n        <ul class="list-style">\n          <li>Engagement d\xE9cor</li>\n          <li>Sangeet &amp; Mehendi decor</li>\n          <li>Muhurtha mandapam &amp; Dining decor</li>\n          <li>Reception, Entrance &amp; Passage decor</li>\n          <li>First night room d\xE9cor &amp; car decor</li>\n          <li>Birthday party</li>\n          <li>Get together party</li>\n          <li>Casino Party &amp; Pool Party</li>\n          <li>Corporate party</li>\n          <li>Cocktail, DJ and Entertainment party</li>\n          <li>And all theme parties</li>\n        </ul>\n      </div>\n    </div>\n  </div>\n</div>\n');
$templateCache.put('source/js/components/contact/contact.html','<div class="classic-events" id="contact">\n  <h2>Contact us</h2>\n  <div class="wrapper">\n    <div class="contact-info">\n      <div class="contact-info-block">\n        <h4>Call</h4>\n        <ul>\n          <li><a href="#" title="+91-9790999569">+91-9790999569</a></li>\n        </ul>\n      </div>\n      <!-- <div class="contact-info-block">\n        <h4>Social</h4>\n        <ul class="inline">\n          <li>\n            <a href="#"></a>\n          </li>\n          <li>\n            <a href="#"></a>\n          </li>\n          <li>\n            <a href="#"></a>\n          </li>\n        </ul>\n      </div> -->\n      <div class="contact-info-block">\n          <h4>Email</h4>\n          <ul>\n            <li><a href="#">subashraguram@gmail.com</a></li>\n            <li><a href="#">classiceventschennai@gmail.com</a></li>\n          </ul>\n      </div>\n    </div>\n  </div>\n</div>\n');
$templateCache.put('source/js/components/gallery/gallery.html','<div class="classic-events gallery" id="gallery">\n  <h2 class="title">Gallery</h2>\n  <div class="wrapper">\n    <ce-gallery-item></ce-gallery-item>\n  </div>\n</div>\n');
$templateCache.put('source/js/components/testimonials/testimonials.html','<div class="classic-events testimonials" id="testimonials">\n  <h2 class="title">Testimonials</h2>\n  <div class="wrapper">\n    <div class="testimonial-wrapper">\n      <h4>Lorem Ipsum is simply dummy text of the printing and typesetting industry</h4>\n      <p>Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled</p>\n    </div>\n\n  </div>\n</div>\n');
$templateCache.put('source/js/components/home/home.html','<div class="classic-events home">\n    <!-- <div class="header-top">\n        <div class="wrapper">\n            <ul>\n                <li><a href="#" title="subashraguram@gmail.com">classiceventschennai@gmail.com</a></li>\n                <li><a href="#" title="9790999569">9790999569</a></li>\n            </ul>\n        </div>\n    </div> -->\n    <div ng-if="home.imageLoaded">\n        <ce-header></ce-header>\n        <!-- Banner section -->\n        <div class="wrapper mobile">\n          <ul class="">\n              <li><a href="#" title="subashraguram@gmail.com">classiceventschennai@gmail.com</a></li>\n              <li><a href="#" title="9790999569">9790999569</a></li>\n          </ul>\n        </div>\n        <ce-banner></ce-banner>\n        <ce-about></ce-about>\n        <ce-gallery></ce-gallery>\n        <!-- <ce-testimonials></ce-testimonials> -->\n        <ce-contact></ce-contact>\n    </div>\n    <div ng-if="home.imageLoaded !== true" class="home-loader">\n        <div class="windows8 loader">\n            <div class="wBall" id="wBall_1">\n                <div class="wInnerBall"></div>\n            </div>\n            <div class="wBall" id="wBall_2">\n                <div class="wInnerBall"></div>\n            </div>\n            <div class="wBall" id="wBall_3">\n                <div class="wInnerBall"></div>\n            </div>\n            <div class="wBall" id="wBall_4">\n                <div class="wInnerBall"></div>\n            </div>\n            <div class="wBall" id="wBall_5">\n                <div class="wInnerBall"></div>\n            </div>\n        </div>\n    </div>\n</div>\n');
$templateCache.put('source/js/directives/banner/banner.html','<div class="classic-events banner">\n    <div class="wrapper">\n        <img src="css/imgs/banner.jpg" alt="Classic Event decor" />\n        <div class="wrapper-logo"></div>\n    </div>\n</div>\n');
$templateCache.put('source/js/directives/footer/footer.html','');
$templateCache.put('source/js/directives/gallery-item/gallery.item.html','<div class="classic-events gallery-item">\n    <ul>\n      <li><img src="files/1_t.jpg" alt="Gallery 1" ce-colorbox image-url="files/1.jpg" id="gallery-item-1"></li>\n      <li><img src="files/2_t.jpg" alt="Gallery 2" ce-colorbox image-url="files/2.jpg" id="gallery-item-2"></li>\n      <li><img src="files/3_t.jpg" alt="Gallery 3" ce-colorbox image-url="files/3.jpg" id="gallery-item-3"></li>\n    <!-- </ul>\n    <ul> -->\n      <!-- <li><img src="files/5.jpg" alt="Gallery 4" ce-colorbox image-url="files/5.jpg" id="gallery-item-4"></li> -->\n      <li><img src="files/6_t.jpg" alt="Gallery 5" ce-colorbox image-url="files/6.jpg" id="gallery-item-5"></li>\n      <!-- <li><img src="files/7.jpg" alt="Gallery 6" ce-colorbox image-url="files/7.jpg" id="gallery-item-6"></li> -->\n    <!-- </ul>\n    <ul> -->\n      <!-- <li><img src="files/8.jpg" alt="Gallery 7" ce-colorbox image-url="files/8.jpg" id="gallery-item-7"></li> -->\n      <li><img src="files/9_t.jpg" alt="Gallery 8" ce-colorbox image-url="files/9.jpg" id="gallery-item-8"></li>\n      <!-- <li><img src="files/10.jpg" alt="Gallery 9" ce-colorbox image-url="files/10.jpg" id="gallery-item-9"></li> -->\n    <!-- </ul>\n    <ul> -->\n      <!-- <li><img src="files/11.jpg" alt="Gallery 10" ce-colorbox image-url="files/11.jpg" id="gallery-item-10"></li> -->\n      <li><img src="files/12_t.jpg" alt="Gallery 11" ce-colorbox image-url="files/12.jpg" id="gallery-item-11"></li>\n      <li><img src="files/13_t.jpg" alt="Gallery 12" ce-colorbox image-url="files/13.jpg" id="gallery-item-12"></li>\n    <!-- </ul>\n    <ul> -->\n      <!-- <li><img src="files/14.jpg" alt="Gallery 13" ce-colorbox image-url="files/14.jpg" id="gallery-item-13"></li>\n      <li><img src="files/15.jpg" alt="Gallery 14" ce-colorbox image-url="files/15.jpg" id="gallery-item-14"></li>\n      <li><img src="files/16.jpg" alt="Gallery 15" ce-colorbox image-url="files/16.jpg" id="gallery-item-15"></li> -->\n    <!-- </ul>\n    <ul> -->\n      <!-- <li><img src="files/17.jpg" alt="Gallery 16" ce-colorbox image-url="files/17.jpg" id="gallery-item-16"></li>\n      <li><img src="files/18.jpg" alt="Gallery 17" ce-colorbox image-url="files/18.jpg" id="gallery-item-17"></li>\n      <li><img src="files/19.jpg" alt="Gallery 18" ce-colorbox image-url="files/19.jpg" id="gallery-item-18"></li> -->\n    <!-- </ul>\n    <ul> -->\n      <li><img src="files/20_t.jpg" alt="Gallery 19" ce-colorbox image-url="files/20.jpg" id="gallery-item-19"></li>\n      <!-- <li><img src="files/21.jpg" alt="Gallery 20" ce-colorbox image-url="files/21.jpg" id="gallery-item-20"></li> -->\n      <li><img src="files/22_t.jpg" alt="Gallery 21" ce-colorbox image-url="files/22.jpg" id="gallery-item-21"></li>\n    </ul>\n</div>\n');
$templateCache.put('source/js/directives/header/header.html','<div class="classic-events" id="classic-header" sticky-header="fix-top">\n    <div class="wrapper">\n        <a class="classic-logo" href="#" title="Classic Events"></a>\n\n        <ul>\n            <li><a href="#" ng-click="header.goTo(\'about\', $event)">About</a></li>\n            <li><a href="#" ng-click="header.goTo(\'gallery\', $event)">Gallery</a></li>\n            <!-- <li><a href="" ng-click="header.goTo(\'testimonials\')">Testimonials</a></li> -->\n            <li><a href="#" ng-click="header.goTo(\'contact\', $event)">Contact</a></li>\n        </ul>\n    </div>\n</div>\n');
$templateCache.put('source/js/directives/menu/menu.html','');}]);
;
(function() {
    angular
        .module('classicevents')
        .directive('ceAbout', ceAbout)
        .controller('CEAboutController', CEAboutController);

    function ceAbout() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'source/js/components/about/about.html',
            controller: CEAboutController,
            controllerAs: 'about',
            bindToController: true
        };
    }

    function CEAboutController($state) {

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


;
(function() {
    angular
        .module('classicevents')
        .directive('ceContact', ceContact)
        .controller('CEContactController', CEContactController);

    function ceContact() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'source/js/components/contact/contact.html',
            controller: CEContactController,
            controllerAs: 'contact',
            bindToController: true
        };
    }

    function CEContactController($state) {

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


;
(function() {
    angular
        .module('classicevents')
        .directive('ceGallery', ceGallery)
        .controller('CEGalleryController', CEGalleryController);

    function ceGallery() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'source/js/components/gallery/gallery.html',
            controller: CEGalleryController,
            controllerAs: 'gallery',
            bindToController: true
        };
    }

    function CEGalleryController($state) {

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


;
(function() {
    angular
        .module('classicevents')
        .directive('ceHome', ceHome)
        .controller('CEHomeController', CEHomeController);

    function ceHome() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'source/js/components/home/home.html',
            controller: CEHomeController,
            controllerAs: 'home',
            bindToController: true
        };
    }

    function CEHomeController($state, preloader, appConstants) {

        var vm = this;

        vm.imageLoaded = false;

        vm.stateChange = stateChange;


        initialize();

        function initialize() {
          preloader
            .preloadImages(appConstants.imageLocations)
            .then(function() {
                process();
                vm.imageLoaded = true;
            },
            function() {
                process();
                vm.imageLoaded = true;
            });
        }

        function process() {

        }

        function stateChange(type) {

        }

    }
})();

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

;
(function() {
    angular
        .module('classicevents')
        .directive('ceBanner', ceBanner)
        .controller('CEBannerController', CEBannerController);

    function ceBanner() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'source/js/directives/banner/banner.html',
            controller: CEBannerController,
            controllerAs: 'banner',
            bindToController: true
        };
    }

    function CEBannerController($state) {

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

;
(function() {
    angular.module('classicevents')
        .factory('colorBox', function() {
            function colorBox() {
                var cb = this;
                cb.el = null;
                cb.$el = null;
                cb.attrs = null;
                cb.scope = null;

                cb.init = function init(scope, element, attrs) {
                    cb.el = element && element.length > 0 ? element[0] : null;
                    cb.attrs = attrs;
                    cb.scope = scope;

                    if (cb.el) {
                        initializeEvents();
                    }
                }

                //Private functions
                function initializeEvents() {
                    cb.el.addEventListener('click', function(e) {
                        var id = cb.el.id;
                        var cbId = 'colorbox-' + id;

                        if (document.getElementById(cbId)) {
                            show(cbId);
                        } else {
                            document.body.appendChild(createHTML(cbId));
                            loadImage(cbId);

                            var el = document.querySelector('#' + cbId + ' .colorbox-close');
                            if (el) {
                                el.addEventListener('click', function() {
                                    hide(cbId);
                                }, true);
                            }

                        }
                        document.body.style.overflow = 'hidden';

                        return false;
                    }, false);
                }

                function loadImage(cbId) {
                    var el = document.getElementById(cbId);
                    if (el) {
                        var img = el.getElementsByTagName('img');
                        if (img && img.length > 0) {
                            img = img[0];
                            img.addEventListener('load', function() {
                                var ratio = 1;
                                ratio = this.width / this.height;

                                if (ratio >= 1) {
                                    this.width = window.innerWidth - (4 + 100);
                                    this.height = (this.width / ratio) - (4);
                                    if (this.height > window.innerHeight) {
                                        this.height = window.innerHeight - (4 + 100);
                                        this.width = (this.height * ratio);
                                    }
                                } else {
                                    this.height = window.innerHeight - (4 + 100);
                                    this.width = (this.height / ratio) - (4);
                                    if (this.width > window.innerWidth) {
                                        this.width = window.innerWidth - (4 + 100);
                                        this.height = (this.width / ratio) - (4);
                                    }

                                }

                                var top = window.innerHeight - this.height;
                                var left = window.innerWidth - this.width;

                                var wrapper = el.getElementsByClassName('colorbox-wrapper');
                                if (wrapper && wrapper.length > 0) {
                                    wrapper[0].style.visibility = 'visible';
                                    wrapper[0].style.top = top / 2 + 'px';
                                    wrapper[0].style.left = left / 2 + 'px';
                                }

                                var loader = el.getElementsByClassName('loader');
                                if (loader && loader.length > 0) {
                                    loader[0].style.display = "none";
                                } else {
                                    loader.style.display = "none";
                                }
                            }, false);
                        }
                    }
                }

                function createHTML(id) {
                    var html = '';
                    html += '<span class="colorbox-close">X</span>';
                    html += '<div class="colorbox-wrapper">';
                    html += '<img src="' + cb.attrs.imageUrl + '" alt="' + cb.attrs.alt + '"/>';
                    html += '</div>';
                    html += '<div class="windows8 loader"><div class="wBall" id="wBall_1">' +
                        '<div class="wInnerBall"></div></div>' +
                        '<div class="wBall" id="wBall_2"><div class="wInnerBall"></div>' +
                        '</div><div class="wBall" id="wBall_3">' +
                        '<div class="wInnerBall"></div></div>' +
                        '<div class="wBall" id="wBall_4"><div class="wInnerBall"></div>' +
                        '</div><div class="wBall" id="wBall_5"><div class="wInnerBall"></div></div></div>';

                    var node = document.createElement('div');
                    node.innerHTML = html;
                    node.className = 'colorbox';
                    node.id = id;
                    return node;
                }

                function show(id) {
                    var cbEL = document.getElementById(id);
                    if (cbEL) {
                        cbEL.style.display = "block";
                    }
                }

                function hide(id) {
                    var cbEL = document.getElementById(id);
                    if (cbEL) {
                        cbEL.style.display = "none";
                        document.body.style.overflow = 'initial';
                    }
                }
            }

            var cbFactory = {
                getInstance: function() {
                    return new colorBox();
                }
            }

            return cbFactory;
        });
})();

;
(function() {
    angular
        .module('classicevents')
        .directive('ceFooter', ceFooter)
        .controller('CEFooterController', CEFooterController);

    function ceFooter() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'source/js/directives/footer/footer.html',
            controller: CEFooterController,
            controllerAs: 'footer',
            bindToController: true
        };
    }

    function CEFooterController($state) {

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

;
(function() {
  angular
    .module('classicevents')
    .directive('ceHeader', ceHeader)
    .controller('CEHeaderController', CEHeaderController);

  function ceHeader() {
    return {
      restrict: 'E',
      replace: true,
      scope: {},
      templateUrl: 'source/js/directives/header/header.html',
      controller: CEHeaderController,
      controllerAs: 'header',
      bindToController: true
    };
  }

  function CEHeaderController($state, $location, $document) {

    var vm = this;

    vm.imageLoaded = false;
    vm.goTo = goTo;

    initialize();

    function initialize() {

    }

    function goTo(title, $event) {
      $event.preventDefault();
      var section = document.getElementById(title);
      var header = document.getElementById('classic-header');
      var pos = section.offsetTop - header.offsetHeight;
      $document.scrollTop(pos, 800);

    }

  }
})();

;
(function() {
    angular
        .module('classicevents')
        .directive('ceMenu', ceMenu)
        .controller('CEMenuController', CEMenuController);

    function ceMenu() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'source/js/directives/menu/menu.html',
            controller: CEMenuController,
            controllerAs: 'menu',
            bindToController: true
        };
    }

    function CEMenuController($state) {

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
