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
