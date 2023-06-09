function onYouTubeIframeAPIReady() {
    theme.ProductVideo.loadVideos(theme.ProductVideo.hosts.youtube);
}
!(function () {
    function a(a, b) {
        b = b || { bubbles: !1, cancelable: !1, detail: void 0 };
        var c = document.createEvent("CustomEvent");
        return c.initCustomEvent(a, b.bubbles, b.cancelable, b.detail), c;
    }
    if ("function" == typeof window.CustomEvent) return !1;
    (a.prototype = window.Event.prototype), (window.CustomEvent = a);
})(),
    "undefined" == typeof theme && (theme = {});
var html = $("html"),
    body = $("body"),
    winWidth = $(window).width(),
    winHeight = $(window).height();
(theme.mobileBrkp = 768),
    (theme.tabletBrkp = 981),
    (theme.LibraryLoader = (function () {
        function a(a, f) {
            var h = g[a];
            if (h && h.status !== e.requested) {
                if (((f = f || function () {}), h.status === e.loaded)) return void f();
                h.status = e.requested;
                var i;
                switch (h.type) {
                    case d.script:
                        i = b(h, f);
                        break;
                    case d.link:
                        i = c(h, f);
                }
                (i.id = h.tagId), (h.element = i);
                var j = document.getElementsByTagName(h.type)[0];
                j.parentNode.insertBefore(i, j);
            }
        }
        function b(a, b) {
            var c = document.createElement("script");
            return (
                (c.src = a.src),
                c.addEventListener("load", function () {
                    (a.status = e.loaded), b();
                }),
                c
            );
        }
        function c(a, b) {
            var c = document.createElement("link");
            return (
                (c.href = a.src),
                (c.rel = "stylesheet"),
                (c.type = "text/css"),
                c.addEventListener("load", function () {
                    (a.status = e.loaded), b();
                }),
                c
            );
        }
        var d = { link: "link", script: "script" },
            e = { requested: "requested", loaded: "loaded" },
            f = "https://cdn.shopify.com/shopifycloud/",
            g = {
                youtubeSdk: { tagId: "youtube-sdk", src: "https://www.youtube.com/iframe_api", type: d.script },
                plyrShopify: { tagId: "plyr-shopify", src: f + "shopify-plyr/v1.0/shopify-plyr-legacy.en.js", type: d.script },
                plyrShopifyStyles: { tagId: "plyr-shopify-styles", src: f + "shopify-plyr/v1.0/shopify-plyr.css", type: d.link },
                shopifyXr: { tagId: "shopify-model-viewer-xr", src: f + "shopify-xr-js/assets/v1.0/shopify-xr.en.js", type: d.script },
                modelViewerUi: { tagId: "shopify-model-viewer-ui", src: f + "model-viewer-ui/assets/v1.0/model-viewer-ui.en.js", type: d.script },
                modelViewerUiStyles: { tagId: "shopify-model-viewer-ui-styles", src: f + "model-viewer-ui/assets/v1.0/model-viewer-ui.css", type: d.link },
            };
        return { load: a };
    })()),
    (theme.homeMaps = function () {
        function a() {
            $(".js-map-ids").each(function () {
                var a = $(this).data("map-id");
                theme.runMap(a);
            });
        }
        function b() {
            var a = $(".js-map-info"),
                b = $(".js-map-trigger"),
                c = (a.hide(), "js-active");
            $(".js-map").each(function (d) {
                $(this).find(a).first().addClass(c).show(), $(this).find(b).first().addClass(c);
            }),
                b.click(function () {
                    var a = $(this).attr("href"),
                        d = $(a).parents(".js-map").find(".js-map-info");
                    if (
                        ($(a).hasClass(c) || (d.removeClass(c).slideUp(), $(a).addClass(c).slideDown()),
                        $(this).parents(".js-map").find(".js-map-media").removeClass(c),
                        $('.js-map-media[data-map-id="' + a + '"]').addClass(c),
                        $(a).find(".home-map__media-canvas").length)
                    ) {
                        var e = $(a).find(".home-map__media-canvas").attr("id");
                        void 0 !== e && theme.runMap(e);
                    }
                    return $(this).hasClass(c) || (b.removeClass(c), $(this).addClass(c)), !1;
                });
        }
        (mapInit = function (a, b, c, d, e) {
            var f, g;
            f = new google.maps.Geocoder();
            var h = new google.maps.LatLng(1, 1),
                i = { zoom: 14, center: h, disableDefaultUI: !0, scrollwheel: !1, keyboardShortcuts: !1, styles: mapStyles[d] };
            (g = new google.maps.Map(document.getElementById(a), i)),
                f &&
                    f.geocode({ address: c }, function (a, b) {
                        if (b == google.maps.GeocoderStatus.OK && b != google.maps.GeocoderStatus.ZERO_RESULTS) {
                            g.setCenter(a[0].geometry.location);
                            new google.maps.Marker({ position: a[0].geometry.location, map: g, icon: window[e] });
                        }
                    });
        }),
            (theme.runMap = function (a) {
                var b = $("#" + a),
                    c = b.data("map-id"),
                    d = b.data("map-section"),
                    e = b.data("map-address"),
                    f = b.data("map-style"),
                    g = b.data("map-pin");
                mapInit(c, d, e, f, g);
            }),
            b();
        new LazyLoad({
            elements_selector: ".js-lazy-map",
            callback_set: function (b) {
                if ($(".js-map-ids").length > 0)
                    if (void 0 === window.google) {
                        var c;
                        (c = void 0 !== theme.map.key ? theme.map.key : ""),
                            $.getScript("https://maps.googleapis.com/maps/api/js?key=" + c).then(function () {
                                (mapPinDark = {
                                    path:
                                        "M50,9.799c-15.188,0-27.499,12.312-27.499,27.499S50,90.201,50,90.201s27.499-37.715,27.499-52.902S65.188,9.799,50,9.799z   M50,44.813c-4.15,0-7.515-3.365-7.515-7.515S45.85,29.784,50,29.784s7.514,3.365,7.514,7.515S54.15,44.813,50,44.813z",
                                    fillColor: "#000000",
                                    anchor: new google.maps.Point(55, 85),
                                    fillOpacity: 1,
                                    scale: 0.6,
                                    strokeWeight: 0,
                                }),
                                    (mapPinLight = {
                                        path:
                                            "M50,9.799c-15.188,0-27.499,12.312-27.499,27.499S50,90.201,50,90.201s27.499-37.715,27.499-52.902S65.188,9.799,50,9.799z   M50,44.813c-4.15,0-7.515-3.365-7.515-7.515S45.85,29.784,50,29.784s7.514,3.365,7.514,7.515S54.15,44.813,50,44.813z",
                                        fillColor: "#ffffff",
                                        anchor: new google.maps.Point(55, 85),
                                        fillOpacity: 1,
                                        scale: 0.6,
                                        strokeWeight: 0,
                                    }),
                                    (mapStyles = {
                                        light: [
                                            { featureType: "water", elementType: "geometry", stylers: [{ color: "#e9e9e9" }, { lightness: 17 }] },
                                            { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#f0f0f0" }, { lightness: 20 }] },
                                            { featureType: "road.highway", elementType: "geometry.fill", stylers: [{ color: "#ffffff" }, { lightness: 17 }] },
                                            { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }] },
                                            { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#ffffff" }, { lightness: 18 }] },
                                            { featureType: "road.local", elementType: "geometry", stylers: [{ color: "#ffffff" }, { lightness: 16 }] },
                                            { featureType: "poi", elementType: "geometry", stylers: [{ color: "#f0f0f0" }, { lightness: 21 }] },
                                            { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#dedede" }, { lightness: 21 }] },
                                            { elementType: "labels.text.stroke", stylers: [{ visibility: "on" }, { color: "#ffffff" }, { lightness: 16 }] },
                                            { elementType: "labels.text.fill", stylers: [{ saturation: 36 }, { color: "#333333" }, { lightness: 40 }] },
                                            { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
                                            { featureType: "transit", elementType: "geometry", stylers: [{ color: "#f2f2f2" }, { lightness: 19 }] },
                                            { featureType: "administrative", elementType: "geometry.fill", stylers: [{ color: "#fefefe" }, { lightness: 20 }] },
                                            { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#fefefe" }, { lightness: 17 }, { weight: 1.2 }] },
                                        ],
                                        dark: [
                                            { featureType: "all", elementType: "labels.text.fill", stylers: [{ saturation: 36 }, { color: "#000000" }, { lightness: 40 }] },
                                            { featureType: "all", elementType: "labels.text.stroke", stylers: [{ visibility: "on" }, { color: "#000000" }, { lightness: 16 }] },
                                            { featureType: "all", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
                                            { featureType: "administrative", elementType: "geometry.fill", stylers: [{ color: "#000000" }, { lightness: 20 }] },
                                            { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#000000" }, { lightness: 17 }, { weight: 1.2 }] },
                                            { featureType: "administrative", elementType: "labels", stylers: [{ visibility: "off" }] },
                                            { featureType: "administrative.country", elementType: "all", stylers: [{ visibility: "simplified" }] },
                                            { featureType: "administrative.country", elementType: "geometry", stylers: [{ visibility: "simplified" }] },
                                            { featureType: "administrative.country", elementType: "labels.text", stylers: [{ visibility: "simplified" }] },
                                            { featureType: "administrative.province", elementType: "all", stylers: [{ visibility: "off" }] },
                                            { featureType: "administrative.locality", elementType: "all", stylers: [{ visibility: "simplified" }, { saturation: "-100" }, { lightness: "30" }] },
                                            { featureType: "administrative.neighborhood", elementType: "all", stylers: [{ visibility: "off" }] },
                                            { featureType: "administrative.land_parcel", elementType: "all", stylers: [{ visibility: "off" }] },
                                            { featureType: "landscape", elementType: "all", stylers: [{ visibility: "simplified" }, { gamma: "0.00" }, { lightness: "74" }] },
                                            { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#000000" }, { lightness: 20 }] },
                                            { featureType: "landscape.man_made", elementType: "all", stylers: [{ lightness: "3" }] },
                                            { featureType: "poi", elementType: "all", stylers: [{ visibility: "off" }] },
                                            { featureType: "poi", elementType: "geometry", stylers: [{ color: "#000000" }, { lightness: 21 }] },
                                            { featureType: "road", elementType: "geometry", stylers: [{ visibility: "simplified" }] },
                                            { featureType: "road.highway", elementType: "geometry.fill", stylers: [{ color: "#000000" }, { lightness: 17 }] },
                                            { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#000000" }, { lightness: 29 }, { weight: 0.2 }] },
                                            { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#000000" }, { lightness: 18 }] },
                                            { featureType: "road.local", elementType: "geometry", stylers: [{ color: "#000000" }, { lightness: 16 }] },
                                            { featureType: "transit", elementType: "geometry", stylers: [{ color: "#000000" }, { lightness: 19 }] },
                                            { featureType: "water", elementType: "geometry", stylers: [{ color: "#000000" }, { lightness: 17 }] },
                                        ],
                                        flat: [
                                            { featureType: "administrative", elementType: "labels.text.fill", stylers: [{ color: "#6195a0" }] },
                                            { featureType: "administrative.province", elementType: "geometry.stroke", stylers: [{ visibility: "off" }] },
                                            { featureType: "landscape", elementType: "geometry", stylers: [{ lightness: "0" }, { saturation: "0" }, { color: "#f5f5f2" }, { gamma: "1" }] },
                                            { featureType: "landscape.man_made", elementType: "all", stylers: [{ lightness: "-3" }, { gamma: "1.00" }] },
                                            { featureType: "landscape.natural.terrain", elementType: "all", stylers: [{ visibility: "off" }] },
                                            { featureType: "poi", elementType: "all", stylers: [{ visibility: "off" }] },
                                            { featureType: "poi.park", elementType: "geometry.fill", stylers: [{ color: "#bae5ce" }, { visibility: "on" }] },
                                            { featureType: "road", elementType: "all", stylers: [{ saturation: -100 }, { lightness: 45 }, { visibility: "simplified" }] },
                                            { featureType: "road.highway", elementType: "all", stylers: [{ visibility: "simplified" }] },
                                            { featureType: "road.highway", elementType: "geometry.fill", stylers: [{ color: "#fac9a9" }, { visibility: "simplified" }] },
                                            { featureType: "road.highway", elementType: "labels.text", stylers: [{ color: "#4e4e4e" }] },
                                            { featureType: "road.arterial", elementType: "labels.text.fill", stylers: [{ color: "#787878" }] },
                                            { featureType: "road.arterial", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
                                            { featureType: "transit", elementType: "all", stylers: [{ visibility: "simplified" }] },
                                            { featureType: "transit.station.airport", elementType: "labels.icon", stylers: [{ hue: "#0a00ff" }, { saturation: "-77" }, { gamma: "0.57" }, { lightness: "0" }] },
                                            { featureType: "transit.station.rail", elementType: "labels.text.fill", stylers: [{ color: "#43321e" }] },
                                            { featureType: "transit.station.rail", elementType: "labels.icon", stylers: [{ hue: "#ff6c00" }, { lightness: "4" }, { gamma: "0.75" }, { saturation: "-68" }] },
                                            { featureType: "water", elementType: "all", stylers: [{ color: "#eaf6f8" }, { visibility: "on" }] },
                                            { featureType: "water", elementType: "geometry.fill", stylers: [{ color: "#c7eced" }] },
                                            { featureType: "water", elementType: "labels.text.fill", stylers: [{ lightness: "-49" }, { saturation: "-53" }, { gamma: "0.79" }] },
                                        ],
                                        clean_cut: [
                                            { featureType: "road", elementType: "geometry", stylers: [{ lightness: 100 }, { visibility: "simplified" }] },
                                            { featureType: "water", elementType: "geometry", stylers: [{ visibility: "on" }, { color: "#C6E2FF" }] },
                                            { featureType: "poi", elementType: "geometry.fill", stylers: [{ color: "#C5E3BF" }] },
                                            { featureType: "road", elementType: "geometry.fill", stylers: [{ color: "#D1D1B8" }] },
                                        ],
                                        minimal_dark: [
                                            { featureType: "all", elementType: "all", stylers: [{ hue: "#ff0000" }, { saturation: -100 }, { lightness: -30 }] },
                                            { featureType: "all", elementType: "labels.text.fill", stylers: [{ color: "#ffffff" }] },
                                            { featureType: "all", elementType: "labels.text.stroke", stylers: [{ color: "#353535" }] },
                                            { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#656565" }] },
                                            { featureType: "poi", elementType: "geometry.fill", stylers: [{ color: "#505050" }] },
                                            { featureType: "poi", elementType: "geometry.stroke", stylers: [{ color: "#808080" }] },
                                            { featureType: "road", elementType: "geometry", stylers: [{ color: "#454545" }] },
                                            { featureType: "transit", elementType: "labels", stylers: [{ hue: "#000000" }, { saturation: 100 }, { lightness: -40 }, { invert_lightness: !0 }, { gamma: 1.5 }] },
                                        ],
                                        blue_water: [
                                            { featureType: "administrative", elementType: "labels.text.fill", stylers: [{ color: "#444444" }] },
                                            { featureType: "landscape", elementType: "all", stylers: [{ color: "#f2f2f2" }] },
                                            { featureType: "poi", elementType: "all", stylers: [{ visibility: "off" }] },
                                            { featureType: "road", elementType: "all", stylers: [{ saturation: -100 }, { lightness: 45 }] },
                                            { featureType: "road.highway", elementType: "all", stylers: [{ visibility: "simplified" }] },
                                            { featureType: "road.arterial", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
                                            { featureType: "transit", elementType: "all", stylers: [{ visibility: "off" }] },
                                            { featureType: "water", elementType: "all", stylers: [{ color: "#46bcec" }, { visibility: "on" }] },
                                        ],
                                    }),
                                    a();
                            });
                    } else a();
            },
        });
    }),
    (theme.layoutSlider = function (a) {
        $(window)
            .resize(function () {
                winWidth = $(window).width();
                var b = $(a);
                winWidth < theme.mobileBrkp ? b.not(".slick-initialized").slick({ slidesToShow: 1, infinite: !1, dots: !0, arrows: !1, centerMode: !0, centerPadding: "30px" }) : b.hasClass("slick-initialized") && b.slick("unslick"),
                    b.on("afterChange", function (a, b, c) {
                        $(this).find(".slick-current").addClass("js-slide-seen");
                    });
            })
            .resize();
    }),
    (theme.productCollSwatch = function () {
        $(".product__swatch__item").click(function () {
            var a = $(this).parents(".js-product"),
                b = a.find(".product__img"),
                c = $(this).data("variant-image"),
                d = $(this).data("variant-url");
            return b.attr("data-src", c), b.addClass("lazyload"), a.find(".js-product-link").attr("href", d), a.find(".js-product-swatch-item").removeClass("js-active"), $(this).addClass("js-active"), !1;
        });
    }),
    (theme.ProductVideo = (function () {
        function a(a, e) {
            if (a.length) {
                var f = a.find("iframe, video")[0],
                    i = a.data("mediaId");
                if (f) {
                    g[i] = {
                        mediaId: i,
                        sectionId: e,
                        host: c(f),
                        container: a,
                        element: f,
                        ready: function () {
                            b(this);
                        },
                    };
                    switch (g[i].host) {
                        case h.html5:
                            theme.LibraryLoader.load("plyrShopify", d.bind(this, h.html5)), theme.LibraryLoader.load("plyrShopifyStyles");
                            break;
                        case h.youtube:
                            theme.LibraryLoader.load("youtubeSdk");
                    }
                }
            }
        }
        function b(a) {
            if (!a.player) {
                var b = a.container.closest(i.productMediaWrapper),
                    c = b.data(j.enableVideoLooping);
                switch (a.host) {
                    case h.html5:
                        a.player = new Shopify.Plyr(a.element, {
                            controls: ["play", "progress", "mute", "volume", "play-large", "fullscreen"],
                            loop: { active: c },
                            hideControlsOnPause: !0,
                            iconUrl: "//cdn.shopify.com/shopifycloud/shopify-plyr/v1.0/shopify-plyr.svg",
                            tooltips: { controls: !1, seek: !0 },
                        });
                        break;
                    case h.youtube:
                        var d = b.data(j.videoId);
                        a.player = new YT.Player(a.element, {
                            videoId: d,
                            events: {
                                onStateChange: function (a) {
                                    0 === a.data && c && a.target.seekTo(0);
                                },
                            },
                        });
                }
                f.on("beforeChange", function (b, c, d, e) {
                    $(this).parents(".section").data("section-id") == a.sectionId &&
                        a.container.data("slide-id") == e &&
                        (Modernizr.touchevents ||
                            (e !== d &&
                                setTimeout(function () {
                                    a.host === h.html5 && a.player.play(), a.host === h.youtube && a.player.playVideo && a.player.playVideo();
                                }, 300)));
                }),
                    f.on("afterChange", function (b, c, d) {
                        $(this).parents(".section").data("section-id") == a.sectionId && a.container.data("slide-id") != d && (a.host === h.html5 && a.player.pause(), a.host === h.youtube && a.player.pauseVideo && a.player.pauseVideo());
                    }),
                    $(document).on("shopify_xr_launch", function () {
                        a.host === h.html5 && a.player.pause(), a.host === h.youtube && a.player.pauseVideo && a.player.pauseVideo();
                    });
            }
        }
        function c(a) {
            return "VIDEO" === a.tagName ? h.html5 : "IFRAME" === a.tagName && /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(a.src) ? h.youtube : null;
        }
        function d(a) {
            for (var b in g)
                if (g.hasOwnProperty(b)) {
                    var c = g[b];
                    c.host === a && c.ready();
                }
        }
        function e(a) {
            for (var b in g)
                if (g.hasOwnProperty(b)) {
                    var c = g[b];
                    c.sectionId === a && (c.player && c.player.destroy(), delete g[b]);
                }
        }
        var f = $(".js-product-slider"),
            g = {},
            h = { html5: "html5", youtube: "youtube" },
            i = { productMediaWrapper: "[data-product-media-wrapper]" },
            j = { enableVideoLooping: "enable-video-looping", videoId: "video-id" };
        return { init: a, hosts: h, loadVideos: d, removeSectionVideos: e };
    })()),
    (theme.ProductModel = (function () {
        function a(a, d) {
            (f[d] = { loaded: !1 }),
                a.each(function (a) {
                    var b = $(this),
                        c = b.data("media-id"),
                        e = $(b.find("model-viewer")[0]),
                        f = e.data("model-id");
                    if (0 === a) {
                        var i = b.closest(j.mediaGroup).find(j.xrButton);
                        h[d] = { $element: i, defaultId: f };
                    }
                    g[c] = { modelId: f, sectionId: d, $container: b, $element: e };
                }),
                window.Shopify.loadFeatures([
                    { name: "shopify-xr", version: "1.0", onLoad: b },
                    { name: "model-viewer-ui", version: "1.0", onLoad: c },
                ]),
                theme.LibraryLoader.load("modelViewerUiStyles");
        }
        function b(a) {
            if (!a) {
                if (!window.ShopifyXR)
                    return void document.addEventListener("shopify_xr_initialized", function () {
                        b();
                    });
                for (var c in f)
                    if (f.hasOwnProperty(c)) {
                        var d = f[c];
                        if (d.loaded) continue;
                        var e = $("#ModelJson-" + c);
                        window.ShopifyXR.addModels(JSON.parse(e.html())), (d.loaded = !0);
                    }
                window.ShopifyXR.setupXRElements();
            }
        }
        function c(a) {
            if (!a)
                for (var b in g)
                    if (g.hasOwnProperty(b)) {
                        var c = g[b];
                        c.modelViewerUi || (c.modelViewerUi = new Shopify.ModelViewerUI(c.$element)), d(c);
                    }
        }
        function d(a) {
            var b = h[a.sectionId];
            i.on("beforeChange", function (c, d, e, f) {
                $(this).parents(".section").data("section-id") == a.sectionId &&
                    a.$container.data("slide-id") == f &&
                    (Modernizr.touchevents ||
                        (f !== e &&
                            (b.$element.attr("data-shopify-model3d-id", a.modelId),
                            setTimeout(function () {
                                a.modelViewerUi.play();
                            }, 300))),
                    $(this).slick("slickSetOption", "swipe", !1));
            }),
                i.on("beforeChange", function (c, d, e, f) {
                    $(this).parents(".section").data("section-id") == a.sectionId &&
                        a.$container.data("slide-id") == e &&
                        a.$container.data("slide-id") != f &&
                        (b.$element.attr("data-shopify-model3d-id", b.defaultId), a.modelViewerUi.pause(), $(this).slick("slickSetOption", "swipe", !0));
                }),
                $(document).on("shopify_xr_launch", function () {
                    a.modelViewerUi.pause();
                });
        }
        function e(a) {
            for (var b in g)
                if (g.hasOwnProperty(b)) {
                    var c = g[b];
                    c.sectionId === a && delete g[b];
                }
            delete f[a];
        }
        var f = {},
            g = {},
            h = {},
            i = $(".js-product-slider"),
            j = { mediaGroup: "[data-product-media-group]", xrButton: "[data-shopify-xr]" };
        return { init: a, removeSectionModels: e };
    })()),
    (theme.productMediaInit = function () {
        $(".product-single__photo__item--video").each(function (a) {
            theme.ProductVideo.init($(this), $(".section--product-single").data("section-id"));
        }),
            $(".product-single__photo__item--model").length > 0 && theme.ProductModel.init($(".product-single__photo__item--model"), $(".section--product-single").data("section-id"));
    }),
    (theme.homeProductMediaInit = function () {
        $(".product-featured__photo__item--video").each(function (a) {
            theme.ProductVideo.init($(this), $(this).parents(".section").data("section-id"));
        }),
            $(".js-section__home-product").each(function (a) {
                $(this).has(".product-featured__photo__item--model").length && theme.ProductModel.init($(this).find(".product-featured__photo__item--model"), $(this).children(".section").data("section-id"));
            });
    }),
    (theme.productSelect = function (a, b, c) {
        var d = document.getElementById("ProductJson-" + a).innerHTML;
        d = JSON.parse(d || "{}");
        var e = b,
            f = function (a, c) {
                function f(a) {
                    var b = setInterval(function () {
                        n.hasClass("slick-initialized") && (n.slick("slickGoTo", a), clearInterval(b));
                    }, 100);
                }
                var g = d.id;
                if (((e = e), document.dispatchEvent(new CustomEvent("venue:variant:update", { bubbles: !0, detail: { product: d, variant: a, cssClass: b } })), a)) {
                    if (a.unit_price_measurement) {
                        var h = $(".js-product-" + g + " .js-price-unit-price"),
                            i = $(".js-product-" + g + " .js-price-unit-measure"),
                            j = Shopify.formatMoney(a.unit_price, theme.money_format),
                            k = 1 === a.unit_price_measurement.reference_value ? a.unit_price_measurement.reference_unit : a.unit_price_measurement.reference_value + a.unit_price_measurement.reference_unit;
                        h.html('<span class="money">' + j + "</span>"), i.text(k), $(".js-product-" + g + " .js-price-unit-note").show();
                    } else $(".js-product-" + g + " .js-price-unit-note").hide();
                    if (a.available) {
                        if (a.inventory_management) {
                            var l = $(".js-product-" + g + " .js-price-stock-note").data("qty-limit"),
                                m = $(".js-product-" + g + " .js-product-variant-select option[value=" + a.id + "]").data("qty");
                            m <= l ? ($(".js-product-" + g + " .js-price-stock-note").show(), $(".js-product-" + g + " .js-price-stock-note span").text(m)) : $(".js-product-" + g + " .js-price-stock-note").hide();
                        } else $(".js-product-" + g + " .js-price-stock-note").hide();
                        $(".js-product-" + g + " .js-product-add")
                            .removeClass("disabled")
                            .addClass("c-btn--plus")
                            .prop("disabled", !1)
                            .find(".js-product-add-text")
                            .text(theme.t.add_to_cart),
                            $(".js-product-" + g + " .js-product-buttons").removeClass("product-single__add--sold"),
                            a.compare_at_price > a.price
                                ? ($(".js-product-" + g + " .js-product-price-number").html(
                                      '<span class="product-' + e + "__price-number product-" + e + '__price-number--sale"><span class="money">' + Shopify.formatMoney(a.price, theme.money_format) + "</span></span>"
                                  ),
                                  $(".js-product-" + g + " .js-product-price-compare").html('<s class="product-' + e + '__price-compare"><span class="money">' + Shopify.formatMoney(a.compare_at_price, theme.money_format) + "</span></s>"))
                                : var discountAmount = "{{ product.tags }}".split(",").filter((tag)=> tag.indexOf("Amount")<0);console.log("Testing! " + discountAmount);($(".js-product-" + g + " .js-product-price-number").html('<span class="product-' + e + '__price-number"><span class="money">' + Shopify.formatMoney(a.price, theme.money_format) + "</span></span>"),
                                  $(".js-product-" + g + " .js-product-price-compare").empty());
                    } else
                        $(".js-product-" + g + " .js-price-stock-note").hide(),
                            $(".js-product-" + g + " .js-product-add")
                                .addClass("disabled")
                                .removeClass("c-btn--plus")
                                .prop("disabled", !0)
                                .find(".js-product-add-text")
                                .text(theme.t.sold_out),
                            $(".js-product-" + g + " .js-product-buttons").addClass("product-single__add--sold"),
                            a.compare_at_price > a.price
                                ? ($(".js-product-" + g + " .js-product-price-number").html(
                                      '<span class="product-' + e + "__price-number product-" + e + '__price-number--sale"><span class="money">' + Shopify.formatMoney(a.price, theme.money_format) + "</span></span>"
                                  ),
                                  $(".js-product-" + g + " .js-product-price-compare").html('<s class="product-' + e + '__price-compare"><span class="money">' + Shopify.formatMoney(a.compare_at_price, theme.money_format) + "</span></s>"))
                                : ($(".js-product-" + g + " .js-product-price-number").html('<span class="product-' + e + '__price-number"><span class="money">' + Shopify.formatMoney(a.price, theme.money_format) + "</span></span>"),
                                  $(".js-product-" + g + " .js-product-price-compare").empty());
                } else
                    $(".js-product-" + g + " .js-price-unit-note").hide(),
                        $(".js-product-" + g + " .js-price-stock-note").hide(),
                        $(".js-product-" + g + " .js-product-price-number").html("&nbsp;"),
                        $(".js-product-" + g + " .js-product-price-compare").empty(),
                        $(".js-product-" + g + " .js-product-add")
                            .addClass("disabled")
                            .prop("disabled", !0)
                            .find(".js-product-add-text")
                            .text(theme.t.unavailable);
                var n = $(".js-product-" + g + " .js-product-slider");
                if (null !== a.featured_image)
                    if (a.featured_image.variant_ids.length > 0) {
                        var o = (a.featured_media.id, $(".js-product-" + g + " .product-" + e + "__photo__item[data-media-id*=" + a.featured_media.id + "]")),
                            p = o.attr("data-slide-id");
                        f(p);
                    } else f(0);
                document.dispatchEvent(new CustomEvent("venue:variant:updated", { bubbles: !0, detail: { product: d, variant: a, cssClass: b } }));
            };
        $(".js-product-single-swatch :radio").change(function () {
            var a = $(this).closest(".js-product-single-swatch").attr("data-option-index"),
                b = $(this).val();
            $(this)
                .closest("form")
                .find(".single-option-selector")
                .eq(a - 1)
                .val(b)
                .change();
            var c = $(this).val();
            $(this).parents(".js-product-single-swatch").find(".js-swatch-variant-title").text(c);
        }),
            $(".js-swatch-variant-title").text($(".js-swatch-color-item :radio:checked").val()),
            !0 !== d.onboarding &&
                (new Shopify.OptionSelectors("productSelect-" + a, { product: d, onVariantSelected: f, enableHistoryState: c }),
                1 == d.options.length && "Title" != d.options[0] && $(".js-product-" + d.id + " .selector-wrapper:eq(0)").prepend('<label for="productSelect-option-0">' + d.options[0] + "</label>"),
                1 == d.variants.length && d.variants[0].title.indexOf("Default") > -1 && ($(".js-product-" + d.id + " .selector-wrapper").hide(), $(".js-product-" + d.id + " .swatch").hide()));
    }),
    (theme.eventFeed = function (a, b, c, d) {
        var e = "https://www.eventbriteapi.com/v3/users/me/owned_events/?token=" + a + "&expand=venue&status=live";
        $.getJSON(e, function (a) {
            var e = $(b).html(),
                f = Handlebars.compile(e)(a);
            $(c).append(f),
                theme.layoutSlider(".js-layout-slider-" + d),
                $("body").data("anim-load") && (sr.reveal(".section--" + d + " .section__link", { distance: 0 }), sr.reveal(".section--" + d + " .home-event__item", { interval: theme.intervalValue }));
        }),
            Handlebars.registerHelper("formatDate", function (a) {
                return fecha.format(new Date(a), "ddd, DD MMM, HH:mm");
            }),
            Handlebars.registerHelper("each_upto", function (a, b, c) {
                if (!a || 0 === a.length) return c.inverse(this);
                for (var d = [], e = 0; e < b && e < a.length; ++e) d.push(c.fn(a[e]));
                return d.join("");
            });
    }),
    (theme.homeMainCarousel = function () {
        function a(a) {
            function b(a) {
                a.target.mute(),
                    theme.videoSize(a.target.f),
                    $(a.target.f).parents(".slick-slide").hasClass("slick-active") &&
                        (a.target.playVideo(),
                        setTimeout(function () {
                            $(a.target.f).parent().addClass("js-loaded");
                        }, 800));
            }
            function c(a) {
                a.data === YT.PlayerState.ENDED && a.target.playVideo();
            }
            for (var d = $(a).find(".js-home-carousel-video-data"), e = 0; e < d.length; e++)
                window[d[e].getAttribute("data-player-id")] = new YT.Player(d[e], {
                    videoId: d[e].getAttribute("data-video-id"),
                    playerVars: { iv_load_policy: 3, modestbranding: 1, playsinline: 1, cc_load_policy: 0, fs: 0, autoplay: 1, mute: 1, controls: 0, showinfo: 0, wmode: "opaque", quality: "hd720", branding: 0, autohide: 0, rel: 0 },
                    events: { onReady: b, onStateChange: c },
                });
        }
        var b = $(".js-home-carousel"),
            c = $(window).width(),
            d = c >= 1;
        b.each(function () {
            var b = $(this);
            b.on("init", function (b, c) {
                if ($(this).find(".js-home-carousel-video").length && d) {
                    var e = $(this);
                    "undefined" == typeof YT
                        ? $.getScript("https://www.youtube.com/iframe_api").done(function () {
                              var b = setInterval(function () {
                                  $.isFunction(YT.Player) && (a(e), clearInterval(b));
                              }, 100);
                          })
                        : a(e);
                }
                $(this).find(".slick-active").addClass("js-slide-active");
            }),
                b.on("afterChange", function (a, b) {
                    if (d && $(this).find(".js-home-carousel-video").length && $(this).find(".slick-active .js-home-carousel-video").length) {
                        var c = $(this).find(".slick-active .js-home-carousel-video-data").attr("data-player-id");
                        window[c].B
                            ? window[c].playVideo()
                            : setTimeout(function () {
                                  window[c].playVideo();
                              }, 1e3);
                        var e = $(this).find(".slick-active .js-home-carousel-video");
                        setTimeout(function () {
                            e.addClass("js-loaded");
                        }, 800);
                    }
                    $(this).find(".slick-slide").removeClass("js-slide-active"), $(this).find(".slick-active").addClass("js-slide-active");
                }),
                b
                    .not(".slick-initialized")
                    .slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: !0,
                        dots: !0,
                        fade: !0,
                        cssEase: "linear",
                        prevArrow: '<div class="home-carousel__nav home-carousel__nav--prev"><i class="icon icon--left-t"></i></div>',
                        nextArrow: '<div class="home-carousel__nav home-carousel__nav--next"><i class="icon icon--right-t"></i></div>',
                    });
            for (var c = 0; c < 10; c++)
                setTimeout(function () {
                    $(".js-home-carousel").slick("setPosition");
                }, 250 * c);
        });
        var e;
        $(window).resize(function () {
            (winWidth = $(window).width()),
                clearTimeout(e),
                (e = setTimeout(function () {
                    theme.videoSize($(".js-home-carousel-video-data"));
                }, 500));
        });
    }),
    (theme.videoSize = function (a) {
        var b = $(a),
            c = b.attr("height"),
            d = b.attr("width"),
            e = b.parent().height(),
            f = b.parent().width(),
            g = (f / d) * c,
            h = (e / c) * d;
        e < g ? b.css({ width: f + "px", height: g + 120 + "px", top: (e - g) / 2 - 60 + "px", left: 0 }) : b.css({ width: h + "px", height: e + 120 + "px", left: (f - h) / 2 + "px", top: "-60px" });
    }),
    (theme.homeVideoGallery = function () {
        function a() {
            function a() {
                if (b < $(".js-vimeo-thumb").length) {
                    thisThumb = $(".js-vimeo-thumb")[b];
                    var c = $(thisThumb).attr("data-video-id");
                    $.ajax({
                        url: "https://vimeo.com/api/v2/video/" + c + ".json",
                        dataType: "json",
                        complete: function (c) {
                            $(thisThumb).attr("data-bgset", c.responseJSON[0].thumbnail_medium), b++, a();
                        },
                    });
                }
            }
            var b = 0;
            if ((a(), $(".js-vimeo-placeholder").length > 0)) {
                var c = $(".js-vimeo-placeholder").attr("data-video-id");
                $.ajax({
                    url: "https://vimeo.com/api/v2/video/" + c + ".json",
                    dataType: "json",
                    success: function (a) {
                        var b = a[0].thumbnail_large,
                            c = b.replace("640", "1280");
                        $(".js-vimeo-placeholder").attr("data-bgset", c);
                    },
                });
            }
        }
        theme.LibraryLoader.load("plyrShopifyStyles"), a(), (homePlayers = []);
        new LazyLoad({
            elements_selector: ".js-lazy-iframe",
            callback_set: function (a) {
                var b = $(a).parent().attr("id");
                (window[b] = new Plyr(".js-home-video-player", {
                    controls: ["play", "progress", "mute", "volume", "play-large", "fullscreen"],
                    loop: { active: !1 },
                    hideControlsOnPause: !0,
                    iconUrl: "//cdn.shopify.com/shopifycloud/shopify-plyr/v1.0/shopify-plyr.svg",
                    tooltips: { controls: !1, seek: !0 },
                })),
                    homePlayers.push(window[b]);
            },
        });
        $(".js-home-video-placeholder-trigger").click(function (a) {
            a.preventDefault();
            var b = ($(this).attr("href"), $(this).attr("href").replace(/#/, ""));
            $(this).parent(".js-home-video-placeholder").addClass("js-hidden"),
                homePlayers.forEach(function (a) {
                    a.pause();
                }),
                window["home_player_" + b].play();
        }),
            $(".js-home-video-trigger").click(function (a) {
                a.preventDefault();
                var b = "#js-home-video-" + $(this).attr("href").replace(/#/, ""),
                    c = $(this).attr("href").replace(/#/, "");
                $(this).parents(".home-video").find(".js-home-video-placeholder").addClass("js-hidden"),
                    $(this).parents(".home-video").find(".js-home-video").removeClass("js-active"),
                    $(b).addClass("js-active"),
                    homePlayers.forEach(function (a) {
                        a.pause();
                    }),
                    $(this).parent().hasClass("js-paused")
                        ? (window["home_player_" + c].play(), $(this).parent().removeClass("js-paused"))
                        : $(this).parent().hasClass("js-active")
                        ? $(this).parent().addClass("js-paused")
                        : window["home_player_" + c].play(),
                    $(".js-home-video-trigger").parent().removeClass("js-active"),
                    $(".js-home-video-trigger").parent().removeClass("js-init"),
                    $(this).parent().addClass("js-active");
            });
    }),
    (theme.masonryLayout = function () {
        $(".o-layout--masonry")
            .imagesLoaded()
            .always(function (a) {
                $(".o-layout--masonry").masonry({ itemSelector: ".o-layout__item", transitionDuration: 0 }), $("body").data("anim-load") && sr.delegate();
            })
            .progress(function (a, b) {
                $(".o-layout--masonry").masonry({ itemSelector: ".o-layout__item", transitionDuration: 0 }), $("body").data("anim-load") && sr.delegate();
            });
    }),
    (theme.animFade = function () {
        $("body").data("anim-fade") &&
            ($('a[href^="#"], a[target="_blank"], a[href^="mailto:"], a[href^="tel:"], a[href*="youtube.com/watch"], a[href*="youtu.be/"]').each(function () {
                $(this).addClass("js-no-transition");
            }),
            (navigator.userAgent.match(/Version\/[\d\.]+.*Safari/) || navigator.userAgent.match(/Firefox\/([0-9]+)\./)) &&
                $("a").on("click", function () {
                    window.setTimeout(function () {
                        $("body").removeClass("js-theme-unloading");
                    }, 1200);
                }),
            $("a:not(.js-no-transition, .js-header-sub-link-a, .js-header-sub-t-a)").bind("click", function (a) {
                if (a.metaKey) return !0;
                a.preventDefault(), $.magnificPopup.close(), $("body").addClass("js-theme-unloading");
                var b = $(this).attr("href");
                window.setTimeout(function () {
                    location.href = b;
                }, 50);
            }));
    }),
    (theme.animScroll = function () {
        if ($("body").data("anim-load")) {
            (theme.intervalStyle = {}),
                "fade_down" == $("body").data("anim-interval-style") ? (theme.intervalStyle = "-20px") : "fade_up" == $("body").data("anim-interval-style") ? (theme.intervalStyle = "20px") : (theme.intervalStyle = "0"),
                (theme.intervalValue = {}),
                $("body").data("anim-interval") ? (theme.intervalValue = 200) : (theme.intervalValue = 0);
            var a = {
                viewFactor: 0.1,
                duration: 1e3,
                distance: theme.intervalStyle,
                scale: 1,
                delay: 0,
                mobile: !0,
                useDelay: "once",
                beforeReveal: function (a) {
                    $(a).addClass("js-sr-loaded");
                },
            };
            (window.sr = new ScrollReveal(a)),
                sr.reveal(".section__title", { distance: "5px" }),
                sr.reveal(".section__title-desc", { distance: 0, delay: 300 }),
                sr.reveal(".newsletter, .section__link, .account", { distance: 0 }),
                sr.reveal(".product-top, .collection-list__item", { interval: theme.intervalValue }),
                sr.reveal(".cart .section__title", { distance: "20px" }),
                sr.reveal(".cart__content", { distance: 0, delay: 500 }),
                sr.reveal(".search-page .section__title", { distance: "20px" }),
                sr.reveal(".search-page__form, .search-page-pagination", { distance: 0, delay: 200 }),
                sr.reveal(".search-page .product-top, .search-page__other-item", { interval: theme.intervalValue, delay: 0 }),
                sr.reveal(".blog", { delay: 300, interval: theme.intervalValue }),
                sr.reveal(".blog-page__tags, .blog-pagination", { distance: 0, delay: 300 }),
                sr.reveal(".blog-page .section__title", { distance: "20px" }),
                sr.reveal(".article .section__title", { distance: "20px" }),
                sr.reveal(".article__date", { distance: "-10px", delay: 500 }),
                sr.reveal(".article__featured-media, .article__content", { distance: 0, delay: 200 }),
                sr.reveal(".article__meta, .article-paginate", { distance: 0 }),
                sr.reveal(".collection__header-info__title", { distance: "20px" }),
                sr.reveal(".collection .product-top", { interval: theme.intervalValue }),
                sr.reveal(".collection__header-media, .collection__header-info__text, .collection-main__sort, .collection-empty, .collection-pagination", { distance: 0, delay: 200 }),
                sr.reveal(".list-collections .section__title", { distance: "20px" }),
                sr.reveal(".list-collections .collection-list__item", { interval: theme.intervalValue, delay: 500 }),
                sr.reveal(".product-single__title-text", { distance: "20px" }),
                sr.reveal(".product-single__title-desc, .breadcrumb, .product-single__photos, .product-single__content, .product-single--minimal .product-single__content-text", { distance: 0, delay: 300, useDelay: "onload" }),
                sr.reveal(".page .section__title", { distance: "20px" }),
                sr.reveal(".faq__cta", { distance: 0, delay: 300 }),
                sr.reveal(".faq__search", { distance: 0, delay: 300 }),
                sr.reveal(".faq__accordion", { distance: 0, delay: 500 }),
                sr.reveal(".faq__category__title", { distance: 0 }),
                sr.reveal(".page__contact-form", { distance: 0, delay: 200 }),
                sr.reveal(".home-carousel .section__title", { distance: 0 }),
                sr.reveal(".home-image-grid__item", { interval: theme.intervalValue }),
                sr.reveal(".home-promo__box"),
                sr.reveal(".home-intro", { distance: 0 }),
                sr.reveal(".home-intro__media, .home-intro__text, .home-intro__video, .home-intro__link-wrap"),
                sr.reveal(".home-logo-list__items", { distance: 0 }),
                sr.reveal(".home-testimonials", { distance: 0 }),
                sr.reveal(".product-featured__photo-wrapper", { distance: 0, delay: 500 }),
                sr.reveal(".home-event__item", { interval: theme.intervalValue }),
                sr.reveal(".home-delivery", { distance: 0 }),
                sr.reveal(".home-delivery__content", { distance: theme.intervalStyle }),
                sr.reveal(".home-map__items"),
                sr.reveal(".home-rich-text__content", { distance: 0, delay: 500 }),
                sr.reveal(".home-inline__item", { interval: theme.intervalValue }),
                sr.reveal(".home-video__stage, .home-video__items", { distance: 0 }),
                sr.reveal(".home-custom__item", { interval: theme.intervalValue }),
                sr.reveal(".home-html", { distance: 0 });
        }
    }),
    (theme.thumbsCarousel = function () {
        $(".js-section__product-single .js-product-slider")
            .not(".slick-initialized")
            .each(function () {
                $(this)
                    .slick({
                        focusOnSelect: !0,
                        accessibility: !0,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: !1,
                        arrows: !0,
                        dots: !0,
                        swipe: !0,
                        fade: !0,
                        adaptiveHeight: !0,
                        speed: 300,
                        cssEase: "ease",
                        lazyLoad: "progressive",
                        prevArrow: '<div class="product-single__photo__nav__item product-single__photo__nav__item--prev"><i class="icon icon--left-l"></i></div>',
                        nextArrow: '<div class="product-single__photo__nav__item product-single__photo__nav__item--next"><i class="icon icon--right-l"></i></div>',
                        customPaging: function (a, b) {
                            return '<button><div class="product-single__photo-thumbs__item">' + $(".js-product-single-thumbs div:nth-child(" + (b + 1) + ")").html() + "</div></button>";
                        },
                        appendDots: $(this).parent().find(".js-product-slider-nav-dots"),
                        responsive: [{ breakpoint: 768, settings: { appendArrows: $(this).parent().find(".js-product-slider-nav") } }],
                    })
                    .on("setPosition", function (a, b) {
                        if ($(".product-single").hasClass("product-single--classic")) {
                            $(".js-product-bg").hasClass("js-product-bg--full") ? (heightFraction = 1) : (heightFraction = 0.55);
                            var c = $(".js-product-slider").find(".slick-list").height(),
                                d = 0;
                            $(".js-product-slider-nav").find(".slick-dots").length && (d = $(".js-product-slider-nav").find(".slick-dots").outerHeight(!0));
                            var e = 0;
                            $(".js-breadcrumb").length && (e = $(".js-breadcrumb").outerHeight(!0));
                            var f = 0;
                            $(".js-product-view-in-space-btn").length > 0 && !$(".js-product-view-in-space-btn").is("[data-shopify-xr-hidden]") && (f = $(".js-product-view-in-space-btn").outerHeight(!0)),
                                $(".js-product-bg").css("height", c * heightFraction + d + e + f + 60 + "px");
                        }
                    });
            });
        for (var a = 0; a < 15; a++)
            setTimeout(function () {
                $(".js-product-slider").slick("setPosition");
            }, 250 * a);
    }),
    (theme.logoCarousel = function () {
        function a(a) {
            a.not(".slick-initialized").slick({
                slidesToShow: slideCount,
                slidesToScroll: slideCount,
                arrows: !0,
                dots: !0,
                fade: !1,
                adaptiveHeight: !1,
                speed: 300,
                cssEase: "ease",
                lazyLoad: "progressive",
                prevArrow: '<div class="home-logo-list-carousel__nav home-logo-list-carousel__nav--prev"><i class="icon icon--left-l"></i></div>',
                nextArrow: '<div class="home-logo-list-carousel__nav home-logo-list-carousel__nav--next"><i class="icon icon--right-l"></i></div>',
                responsive: [{ breakpoint: theme.mobileBrkp, settings: { swipeToSlide: !0, variableWidth: !0, slidesToShow: 1, slidesToScroll: 1 } }],
            });
        }
        function b(a) {
            a.not(".slick-initialized").slick({
                slidesToShow: slideCount,
                slidesToScroll: slideCount,
                arrows: !0,
                dots: !0,
                fade: !1,
                adaptiveHeight: !1,
                speed: 300,
                cssEase: "ease",
                lazyLoad: "progressive",
                prevArrow: '<div class="home-logo-list-carousel__nav home-logo-list-carousel__nav--prev"><i class="icon icon--left-l"></i></div>',
                nextArrow: '<div class="home-logo-list-carousel__nav home-logo-list-carousel__nav--next"><i class="icon icon--right-l"></i></div>',
            });
        }
        function c(a) {
            a.not(".slick-initialized").slick({ slidesToShow: 1, slidesToScroll: 1, swipeToSlide: !0, variableWidth: !0, arrows: !1, dots: !0, fade: !1, adaptiveHeight: !1, speed: 300, cssEase: "ease", lazyLoad: "progressive" });
        }
        $(window)
            .resize(function () {
                (winWidth = $(window).width()),
                    $(".js-home-logo-list-carousel").each(function () {
                        (carousel = $(this)),
                            (slideCount = carousel.data("carouselCount")),
                            (desktop = carousel.data("carouselDesktop")),
                            (mobile = carousel.data("carouselMobile")),
                            desktop && mobile
                                ? a(carousel, slideCount)
                                : desktop
                                ? winWidth >= theme.mobileBrkp
                                    ? b(carousel, slideCount)
                                    : carousel.hasClass("slick-initialized") && carousel.slick("unslick")
                                : mobile && (winWidth < theme.mobileBrkp ? c(carousel, slideCount) : carousel.hasClass("slick-initialized") && carousel.slick("unslick"));
                    });
            })
            .resize();
    }),
    (theme.testimonialsCarousel = function () {
        function a(a) {
            a.not(".slick-initialized").slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: !0,
                dots: !0,
                fade: !1,
                adaptiveHeight: !1,
                speed: 300,
                cssEase: "ease",
                lazyLoad: "progressive",
                prevArrow: '<div class="home-testimonials-carousel__nav home-testimonials-carousel__nav--prev"><i class="icon icon--left-l"></i></div>',
                nextArrow: '<div class="home-testimonials-carousel__nav home-testimonials-carousel__nav--next"><i class="icon icon--right-l"></i></div>',
            });
        }
        $(window)
            .resize(function () {
                (winWidth = $(window).width()),
                    $(".js-home-testimonials-carousel").each(function () {
                        (carousel = $(this)),
                            (desktop = carousel.data("carouselDesktop")),
                            (mobile = carousel.data("carouselMobile")),
                            desktop && mobile
                                ? a(carousel)
                                : desktop
                                ? winWidth >= theme.mobileBrkp
                                    ? a(carousel)
                                    : carousel.hasClass("slick-initialized") && carousel.slick("unslick")
                                : mobile && (winWidth < theme.mobileBrkp ? a(carousel) : carousel.hasClass("slick-initialized") && carousel.slick("unslick"));
                    });
            })
            .resize();
    }),
    (theme.headerScrollUp = function () {
        function a() {
            var a = $(this).scrollTop();
            Math.abs(c - a) <= d ||
                (a > c && a > e
                    ? ($(".js-header").css({
                          "-webkit-transform": "translateY(-" + $(".js-header").outerHeight() + "px)",
                          "-moz-transform": "translateY(-" + $(".js-header").outerHeight() + "px)",
                          transform: "translateY(-" + $(".js-header").outerHeight() + "px)",
                      }),
                      $(body).removeClass("header-down").addClass("header-up"),
                      $(".js-header").trigger("resize"))
                    : (a + $(window).height() < $(document).height() && $(".js-header").css({ "-webkit-transform": "translateY(0)", "-moz-transform": "translateY(0)", transform: "translateY(0)" }),
                      $(body).removeClass("header-up").addClass("header-down"),
                      $(".js-header").trigger("resize"),
                      a < 100 &&
                          setTimeout(function () {
                              $(".js-header").trigger("resize");
                          }, 250)),
                (c = a));
        }
        if ($(".js-header").hasClass("js-header-scroll")) {
            var b,
                c = 0,
                d = 5,
                e = $(".js-header").outerHeight();
            $(window).scroll(function (a) {
                b = !0;
            }),
                setInterval(function () {
                    $(".js-header").hasClass("js-header-scroll") && b && (a(), (b = !1));
                }, 250);
        }
    }),
    (theme.scrollToFixedProductSingle = function () {
        $(".js-product-single-box").scrollToFixed({
            marginTop: function () {
                return (
                    $(".js-header").hasClass("js-header-scroll")
                        ? $("body").hasClass("header-down")
                            ? (prodBoxMargins = $(".js-header").outerHeight() + 18)
                            : (prodBoxMargins = 18)
                        : $(".js-header").hasClass("js-header-sticky")
                        ? (prodBoxMargins = $(".js-header").outerHeight() + 18)
                        : (prodBoxMargins = 18),
                    prodBoxMargins
                );
            },
            postFixed: function () {
                $(this).addClass("scroll-to-fixed-unfixed");
            },
            fixed: function () {
                $(this).removeClass("scroll-to-fixed-unfixed");
            },
            limit: function () {
                return $(".js-product-single").height() + $(".js-product-single").offset().top - $(".js-product-single-box").outerHeight() - 15;
            },
            minWidth: theme.tabletBrkp,
            spacerClass: "product-box-spacer",
            zIndex: 10,
        });
    }),
    (theme.scrollToFixedFaq = function () {
        $(".js-faq-categories").scrollToFixed({
            marginTop: function () {
                return (
                    $(".js-header").hasClass("js-header-scroll")
                        ? $("body").hasClass("header-down")
                            ? (prodBoxMargins = $(".js-header").outerHeight() + 18)
                            : (prodBoxMargins = 18)
                        : $(".js-header").hasClass("js-header-sticky")
                        ? (prodBoxMargins = $(".js-header").outerHeight() + 18)
                        : (prodBoxMargins = 18),
                    prodBoxMargins
                );
            },
            postFixed: function () {
                $(this).addClass("scroll-to-fixed-unfixed");
            },
            fixed: function () {
                $(this).removeClass("scroll-to-fixed-unfixed");
            },
            limit: function () {
                return $(".js-faq-page").height() + $(".js-faq-page").offset().top - $(".js-faq-categories").outerHeight() + 15;
            },
            zIndex: 10,
            minWidth: theme.tabletBrkp,
            spacerClass: "faq-categories-spacer",
        });
    }),
    (theme.scrollToFixedHeader = function () {
        $(".js-header").scrollToFixed({ zIndex: 11, spacerClass: "header-fixed-spacer" }),
            $(".js-header").hasClass("js-header-sticky") || $(".js-header").trigger("detach.ScrollToFixed"),
            $(window).scroll(function () {
                $(window).scrollTop() >= 80 ? $(".js-header-sticky").addClass("js-header-sticky--fixed") : $(".js-header-sticky").removeClass("js-header-sticky--fixed");
            });
    }),
    (theme.accordion = function () {
        var a = $(".js-accordion-info"),
            b = $(".js-accordion-trigger"),
            c = (a.hide(), "js-active");
        b.click(function () {
            var a = $(this).attr("href");
            if (
                (setTimeout(function () {
                    $(".js-product-single-box").trigger("resize");
                }, 400),
                $(this).hasClass("js-accordion-scroll"))
            ) {
                var b = $(".js-accordion").find("[href='" + $(this).attr("href") + "']");
                return (
                    $(".js-header").hasClass("js-header-sticky") ? (scrollOffset = $(".js-header").outerHeight() + 18) : (scrollOffset = 18),
                    $("html,body").animate({ scrollTop: b.offset().top - scrollOffset }, 800),
                    $(a).addClass(c).stop().slideDown(),
                    b.addClass(c),
                    !1
                );
            }
            return $(a).hasClass(c) ? ($(this).removeClass(c), $(a).removeClass(c).stop().slideUp()) : ($(a).addClass(c).stop().slideDown(), $(this).addClass(c)), !1;
        }),
            "undefined" != typeof faq_items &&
                ($(".js-faq-autocomplete").autocomplete({
                    lookup: faq_items,
                    lookupFilter: function (a, b, c) {
                        var d = a.content.toLowerCase(),
                            e = a.value.toLowerCase();
                        return d.indexOf(c) > -1 || e.indexOf(c) > -1;
                    },
                    onSelect: function (a) {
                        $(".js-header").hasClass("js-header-sticky") ? (scrollOffset = $(".js-header").outerHeight() + 18) : (scrollOffset = 18),
                            $("html,body").animate(
                                {
                                    scrollTop:
                                        $(".js-accordion")
                                            .find("[href='#" + a.data + "']")
                                            .offset().top - scrollOffset,
                                },
                                800
                            ),
                            setTimeout(function () {
                                $("#" + a.data)
                                    .addClass(c)
                                    .stop()
                                    .slideDown(),
                                    $(".js-accordion")
                                        .find("[href='#" + a.data + "']")
                                        .addClass(c);
                            }, 800),
                            $(this).val("");
                    },
                }),
                $(".js-faq-autocomplete").disableAutoFill());
    }),
    (theme.scrollToDiv = function () {
        $(".js-scroll-id").click(function (a) {
            var b = $(this).attr("href");
            return $(".js-header").hasClass("js-header-sticky") ? (scrollOffset = $(".js-header").outerHeight() + 18) : (scrollOffset = 18), $("html,body").animate({ scrollTop: $(b).offset().top - scrollOffset }, 800), !1;
        });
    }),
    (theme.localizeToggle = function () {
        var a = $(".js-localize-box"),
            b = $(".js-localize-trigger"),
            c = $(".js-localize-item"),
            d = "js-active";
        c.click(function () {
            var a = $(this).data("value");
            return $(this).parents(".js-localize-wrapper").find("[data-disclosure-input]").val(a), $(this).parents("form").submit(), !1;
        }),
            b.click(function () {
                var c = $(this).parents(".js-localize-wrapper").find(a);
                return (
                    $(this).hasClass(d)
                        ? ($(this).removeClass(d).attr("aria-expanded", "false"), $(c).removeClass(d))
                        : (a.removeClass(d), b.removeClass(d).attr("aria-expanded", "false"), $(c).addClass(d), $(this).addClass(d).attr("aria-expanded", "true")),
                    !1
                );
            }),
            a
                .focusin(function () {
                    $(this).addClass(d), $(this).parents(".js-localize-wrapper").find(b).addClass(d).attr("aria-expanded", "true");
                })
                .focusout(function () {
                    $(this).removeClass(d), $(this).parents(".js-localize-wrapper").find(b).removeClass(d).attr("aria-expanded", "false");
                }),
            $(document).click(function (c) {
                a.is(c.target) || 0 !== a.has(c.target).length || (a.removeClass(d), b.removeClass(d).attr("aria-expanded", "false"));
            });
    }),
    (theme.headerNav = function () {
        var a = $(".js-header-sub-link"),
            b = $(".js-header-sub-t-link"),
            c = $(".js-header-sub-link-a"),
            d = $(".js-header-sub-t-a"),
            e = "js-active",
            f = $(".js-heaver-navs"),
            g = $(".js-mobile-draw-icon"),
            h = $(".js-search-draw-icon"),
            i = $(".js-cart-draw-icon"),
            j = $(".js-primary-nav"),
            k = $(".js-secondary-nav"),
            l = $(".js-main-logo");
        a
            .focusin(function () {
                $(this).addClass(e), $(this).find(c).attr("aria-expanded", "true");
            })
            .focusout(function () {
                a.removeClass(e), $(this).find(c).attr("aria-expanded", "false");
            }),
            b.focusin(function () {
                b.removeClass(e), d.attr("aria-expanded", "false"), $(this).addClass(e), $(this).find(d).attr("aria-expanded", "true");
            }),
            a.mouseout(function () {
                $(this).removeClass(e);
            }),
            b.mouseout(function () {
                $(this).removeClass(e);
            }),
            $(".header--parent-disabled .js-header-sub-link-a, .header--parent-disabled .js-header-sub-t-a").click(function (a) {
                a.preventDefault();
            }),
            $(window)
                .resize(function () {
                    winWidth = $(window).width();
                    var a = f.width(),
                        b = j.width(),
                        c = k.width(),
                        d = (l.width(), a / 2 - l.width() / 2);
                    winWidth >= theme.mobileBrkp
                        ? $(".js-header").hasClass("header--center")
                            ? ($(".js-header").removeClass("header--inline-icons"), g.hide(), h.hide(), i.hide())
                            : d < b || d < c
                            ? ($(".js-header").removeClass("header--inline-icons"), g.show(), h.show(), i.show(), j.hide(), k.hide())
                            : (g.hide(), h.hide(), i.hide(), j.show(), k.show())
                        : (g.show(), h.show(), i.show());
                })
                .resize(),
            b.on("mouseover focusin", function () {
                var a = $(this).find(".js-nav-sub-t");
                winWidth - (a.offset().left + a.width()) < 1 && (a.css("right", "179px"), a.css("left", "auto"));
            });
    }),
    (theme.homeFeaturedProduct = function () {
        $(".js-section__home-product .js-product-slider")
            .not(".slick-initialized")
            .each(function () {
                $(this).slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    accessibility: !0,
                    arrows: !0,
                    dots: !0,
                    fade: !0,
                    adaptiveHeight: !0,
                    infinite: !1,
                    swipe: !0,
                    speed: 300,
                    cssEase: "ease",
                    prevArrow: '<div class="product-featured__photo__nav__item product-featured__photo__nav__item--prev"><i class="icon icon--left"></i></div>',
                    nextArrow: '<div class="product-featured__photo__nav__item product-featured__photo__nav__item--next"><i class="icon icon--right"></i></div>',
                    appendDots: $(this).parent().find(".js-product-slider-nav-dots"),
                    appendArrows: $(this).parent().find(".js-product-slider-nav"),
                });
            });
    }),
    (theme.triggerActive = function () {
        var a = ($(".js-toggle-target"), $(".js-toggle-trigger")),
            b = "js-active";
        a.click(function (a) {
            var c = $(this).attr("href");
            $(this).hasClass(b) ? ($(this).removeClass(b), $(c).removeClass(b), $(this).parent().attr("aria-expanded", "false")) : ($(this).addClass(b), $(c).addClass(b), $(this).parent().attr("aria-expanded", "true")), a.preventDefault();
        });
    }),
    (theme.selectWrapper = function () {
        function a() {
            $(".selector-wrapper").each(function (a) {
                var b = $(this).find("label").width();
                $(this)
                    .find("select")
                    .css("padding-left", 20 + b);
            });
        }
        a(), setTimeout(a, 500), setTimeout(a, 2e3);
    }),
    (theme.homeSectionMargin = function () {
        $(".shopify-section").each(function () {
            var a = $(this).find(".section");
            a.removeAttr("style"), a.hasClass("section--has-bg") && $(this).next().find(".section").is(".section--full-bg.section--has-bg") && a.css("margin-bottom", "0");
        });
    }),
    (theme.ageCheckerCookie = function () {
        var a = "age-checked";
        $(".js-age-draw").data("age-check-enabled") && "undefined" != typeof Cookies && "1" !== Cookies(a) && theme.mfpOpen("age"),
            $(".js-age-close").click(function (b) {
                Cookies(a, "1", { expires: 14, path: "/" }), $.magnificPopup.close(), b.preventDefault();
            });
    }),
    (theme.promoPopCookie = function () {
        var a = "promo-showed",
            b = $(".js-promo-pop").data("promo-delay"),
            c = $(".js-promo-pop").data("promo-expiry");
        $(".js-promo-pop").data("promo-enabled") &&
            "undefined" != typeof Cookies &&
            "1" !== Cookies(a) &&
            setTimeout(function () {
                theme.promoPop("open");
            }, b),
            $(".js-promo-pop-close").click(function (b) {
                Cookies(a, "1", { expires: c, path: "/" }), theme.promoPop("close"), b.preventDefault();
            });
    }),
    (theme.footerTweet = function () {
        if ($(".js-footer-tweet").data("footer-tweet-enable")) {
            var a = $(".js-footer-tweet").data("footer-tweet-user").substring(1);
            (window.twttr = (function (a, b, c) {
                var d,
                    e = a.getElementsByTagName(b)[0],
                    f = window.twttr || {};
                return a.getElementById(c)
                    ? f
                    : ((d = a.createElement(b)),
                      (d.id = c),
                      (d.src = "https://platform.twitter.com/widgets.js"),
                      e.parentNode.insertBefore(d, e),
                      (f._e = []),
                      (f.ready = function (a) {
                          f._e.push(a);
                      }),
                      f);
            })(document, "script", "twitter-wjs")),
                twttr.ready(function () {
                    twttr.widgets.createTimeline({ sourceType: "profile", screenName: a }, document.getElementById("footer-tweet"), { tweetLimit: 1 }).then(function (a) {
                        var b = $(a).contents().find(".timeline-Tweet-text").html();
                        $(".js-footer-tweet-text").html(b);
                    });
                });
        }
    }),
    (theme.mfpOpen = function (a) {
        var b = '<button title="Close (Esc)" type="button" class="mfp-close mfp-close--custom js-close-mfp"><i class="icon icon--close"></i></button>';
        switch (a) {
            case "cart":
                theme.cart_ajax && $.magnificPopup.open({ items: { src: ".js-cart-draw" }, type: "inline", mainClass: "mfp-medium", fixedContentPos: !0, midClick: !0, closeMarkup: b, removalDelay: 200 });
                break;
            case "search":
                $.magnificPopup.open({ items: { src: ".js-search-draw" }, type: "inline", mainClass: "mfp-medium", fixedContentPos: !0, focus: ".js-search-input", closeMarkup: b, removalDelay: 200 });
                break;
            case "age":
                $.magnificPopup.open({ items: { src: ".js-age-draw" }, type: "inline", mainClass: "mfp-dark", fixedContentPos: !0, modal: !0, showCloseBtn: !1, removalDelay: 200 });
                break;
            case "menu-draw":
                $.magnificPopup.open({ items: { src: ".js-menu-draw" }, type: "inline", mainClass: "mfp-draw", fixedContentPos: !0, closeMarkup: b, removalDelay: 200 });
                break;
            case "collection-draw":
                $.magnificPopup.open({
                    items: { src: ".js-collection-draw" },
                    callbacks: {
                        resize: function () {
                            $(".js-collection-draw").hasClass("collection-sidebar--sidebar") && winWidth >= theme.tabletBrkp && $.magnificPopup.close();
                        },
                    },
                    type: "inline",
                    mainClass: "mfp-draw",
                    fixedContentPos: !0,
                    closeMarkup: b,
                    removalDelay: 200,
                });
        }
    }),
    (theme.collectionSort = function () {
        if (((Shopify.queryParams = {}), location.search.length))
            for (var a, b = 0, c = location.search.substr(1).split("&"); b < c.length; b++) (a = c[b].split("=")), a.length > 1 && (Shopify.queryParams[decodeURIComponent(a[0])] = decodeURIComponent(a[1]));
        var d = $(".js-collection-sort").data("default-sort");
        $("#SortBy")
            .val(d)
            .bind("change", function () {
                (Shopify.queryParams.sort_by = jQuery(this).val()), (location.search = jQuery.param(Shopify.queryParams));
            });
    }),
    (theme.magnificVideo = function () {
        $(".js-pop-video").magnificPopup({
            type: "iframe",
            mainClass: "mfp-medium mfp-close-corner",
            removalDelay: 200,
            closeMarkup: '<button title="Close (Esc)" type="button" class="mfp-close mfp-close--custom js-close-mfp"><i class="icon icon--close"></i></button>',
        });
    }),
    (theme.productZoom = function () {
        var a = function (a, b) {
            var c = document.querySelectorAll(".pswp")[0],
                d = $(".js-product-slider"),
                e = [];
            $(".js-pswp-img").each(function () {
                var a = $(this).prop("currentSrc") || $(this).prop("src"),
                    b = { msrc: a, src: $(this).data("pswp-src"), w: $(this).data("pswp-width"), h: $(this).data("pswp-height"), mediaId: $(this).data("media-id"), el: $(this)[0] };
                e.push(b);
            });
            var f = {
                    history: !1,
                    index: b,
                    closeOnScroll: !1,
                    getThumbBoundsFn: function () {
                        var a = window.pageYOffset || document.documentElement.scrollTop,
                            c = e[b].el,
                            d = c.getBoundingClientRect();
                        return { x: d.left, y: d.top + a, w: d.width };
                    },
                },
                g = new PhotoSwipe(c, PhotoSwipeUI_Default, e, f);
            g.init(),
                g.listen("close", function () {
                    var a = $(".product-single__photo__item[data-media-id=" + this.currItem.mediaId + "]");
                    d.slick("slickGoTo", a[0].dataset.slideId);
                });
        };
        $(document).on("click", ".js-pswp-zoom", function () {
            var b = $(this),
                c = $(this).data("image-count");
            a(b, c);
        });
    }),
    (theme.promoPop = function (a) {
        var b = $(".js-promo-pop"),
            c = "js-active";
        "open" == a ? b.addClass(c) : "close" == a && b.removeClass(c);
    }),
    (theme.cartCheckbox = function () {
        $(document).on("click", ".js-cart-checkout-validate", function () {
            if (!$(".js-cart-terms-input").is(":checked")) {
                return $(this).parents("form").find(".js-cart-terms-error").addClass("js-active"), !1;
            }
            $(this).submit();
        }),
            $(document).on("change", ".js-cart-terms-input", function () {
                $(".js-cart-terms-error").removeClass("js-active");
            });
    }),
    (theme.runAjaxCart = function () {
        theme.ajaxCartInit(), ajaxCart.load();
    }),
    (theme.productRecommendations = function () {
        var a = document.querySelector(".js-product-recommendations");
        if (null !== a) {
            var b = a.dataset.productId,
                c = a.dataset.limit,
                d = a.dataset.baseUrl + "?section_id=product-recommendations&limit=" + c + "&product_id=" + b,
                e = new XMLHttpRequest();
            e.open("GET", d),
                (e.onload = function () {
                    if (e.status >= 200 && e.status < 300) {
                        var b = document.createElement("div");
                        (b.innerHTML = e.response),
                            (a.parentElement.innerHTML = b.querySelector(".js-product-recommendations").innerHTML),
                            theme.runAjaxCart(),
                            theme.productCollSwatch(),
                            $(".js-related-products").each(function (a) {
                                var b = $(this).data("section-id");
                                theme.layoutSlider(".js-layout-slider-" + b);
                            }),
                            $("body").data("anim-load") &&
                                setTimeout(function () {
                                    sr.reveal(".section--related-products .product-top", { interval: theme.intervalValue }), sr.reveal(".section--related-products .section__title", { distance: "5px" });
                                }, 1e3);
                    }
                }),
                e.send();
        }
    }),
    $(document).ready(function () {
        function a(b) {
            9 === b.keyCode && (body.addClass("js-using-tab"), window.removeEventListener("keydown", a));
        }
        function b() {
            lazySizes.autoSizer.checkElems();
        }
        $("body").on("afterAddItem.ajaxCart", function () {
            setTimeout(function () {
                theme.mfpOpen("cart");
            }, 100);
        }),
            window.addEventListener("keydown", a),
            $(".js-events").each(function (a) {
                var b = $(this).data("section-id"),
                    c = $(this).data("api-key");
                theme.eventFeed(c, "#eventTemplate" + b, "#eventContainer" + b, b);
            }),
            $(".js-events-onboarding").each(function (a) {
                var b = $(this).data("section-id");
                theme.layoutSlider(".js-layout-slider-" + b);
            }),
            $(".js-home-collection-list").each(function (a) {
                var b = $(this).data("section-id");
                theme.layoutSlider(".js-layout-slider-" + b);
            }),
            $(".js-home-products").each(function (a) {
                var b = $(this).data("section-id");
                theme.layoutSlider(".js-layout-slider-" + b);
            }),
            $(".js-page-products").each(function (a) {
                var b = $(this).data("section-id");
                theme.layoutSlider(".js-layout-slider-" + b);
            }),
            $(".js-home-testimonials").each(function (a) {
                var b = $(this).data("section-id");
                theme.layoutSlider(".js-layout-slider-" + b);
            }),
            $(".video-wrapper").fitVids(),
            $('.rte iframe[src*="youtube"]').parent().fitVids(),
            $('.rte iframe[src*="vimeo"]').parent().fitVids(),
            $(".rte table").wrap("<div style='overflow:auto;-webkit-overflow-scrolling:touch'></div>"),
            $(".js-map-replace").appendAround(),
            $(".js-cart-replace").appendAround(),
            $(document).on("click", ".js-search-trigger", function (a) {
                theme.mfpOpen("search"), a.preventDefault();
            }),
            theme.cart_ajax &&
                $(document).on("click", ".js-cart-trigger", function (a) {
                    theme.mfpOpen("cart"), a.preventDefault();
                }),
            $(document).on("click", ".js-mobile-draw-trigger", function (a) {
                theme.mfpOpen("menu-draw"), a.preventDefault();
            }),
            $(document).on("click", ".js-collection-draw-trigger", function (a) {
                theme.mfpOpen("collection-draw"), a.preventDefault();
            }),
            $(document).on("click", ".js-close-mfp", function (a) {
                $.magnificPopup.close(), a.preventDefault();
            }),
            $(document).on("lazybeforeunveil", function () {
                theme.masonryLayout();
            }),
            setTimeout(b(), 2e3),
            setTimeout(b(), 4e3),
            null === document.querySelector(".js-product-recommendations") && theme.runAjaxCart(),
            theme.productRecommendations(),
            theme.masonryLayout(),
            theme.selectWrapper(),
            theme.triggerActive(),
            theme.headerNav(),
            theme.localizeToggle(),
            theme.magnificVideo(),
            theme.ageCheckerCookie(),
            theme.promoPopCookie(),
            theme.footerTweet(),
            theme.scrollToDiv(),
            theme.animFade(),
            theme.animScroll(),
            theme.productCollSwatch(),
            theme.cartCheckbox(),
            theme.homeMaps(),
            theme.homeVideoGallery(),
            theme.homeMainCarousel(),
            theme.homeProductMediaInit(),
            theme.homeFeaturedProduct(),
            theme.homeSectionMargin(),
            theme.testimonialsCarousel(),
            theme.logoCarousel(),
            theme.collectionSort(),
            theme.productMediaInit(),
            theme.thumbsCarousel(),
            theme.scrollToFixedProductSingle(),
            theme.scrollToFixedFaq(),
            theme.scrollToFixedHeader(),
            theme.headerScrollUp(),
            theme.accordion(),
            theme.productZoom();
    }),
    $(document)
        .on("shopify:section:load", function (a) {
            var b = $(a.target),
                c = b.attr("class").replace("shopify-section", "").trim(),
                d = a.originalEvent.detail.sectionId,
                e = ".section--" + d;
            switch (
                (theme.homeSectionMargin(),
                $("body").data("anim-load") && (sr.reveal(e + " .section__title", { distance: "5px" }), sr.reveal(e + " .section__title-desc", { distance: 0, delay: 300 }), sr.reveal(e + " .section__link", { distance: 0 })),
                c)
            ) {
                case "js-section__home-collection":
                    theme.layoutSlider(".js-layout-slider-" + d), theme.masonryLayout(), theme.productCollSwatch(), $("body").data("anim-load") && sr.reveal(e + " .product-top", { interval: theme.intervalValue });
                    break;
                case "js-section__home-events":
                    var f = $(".js-events-" + d),
                        g = f.data("section-id"),
                        h = f.data("api-key");
                    $("body").data("anim-load") && sr.reveal(e + " .home-event__item", { interval: theme.intervalValue }),
                        $(b).find(".js-events-onboarding").length ? theme.layoutSlider(".js-layout-slider-" + d) : theme.eventFeed(h, "#eventTemplate" + g, "#eventContainer" + g, g);
                    break;
                case "js-section__home-slider":
                    b.find(".js-home-carousel-video-data").each(function () {
                        var a = $(this).attr("data-player-id");
                        window[a] = "undefined";
                    }),
                        theme.homeMainCarousel(),
                        $("body").data("anim-load") && sr.reveal(e + " .home-carousel", { distance: 0 });
                    break;
                case "js-section__home-testimonials":
                    theme.testimonialsCarousel(), $("body").data("anim-load") && sr.reveal(e + " .home-testimonials", { distance: 0 });
                    break;
                case "js-section__home-image-grid":
                    $("body").data("anim-load") && sr.reveal(e + " .home-image-grid__item", { interval: theme.intervalValue });
                    break;
                case "js-section__home-logo-list":
                    theme.logoCarousel(), $("body").data("anim-load") && sr.reveal(e + " .home-logo-list__items", { distance: 0 });
                    break;
                case "js-section__home-video":
                    theme.homeVideoGallery(), $("body").data("anim-load") && sr.reveal(e + " .home-video__stage, .home-video__items", { distance: 0 });
                    break;
                case "js-section__home-blog":
                    theme.masonryLayout(), $("body").data("anim-load") && sr.reveal(e + " .blog", { delay: 500, interval: theme.intervalValue });
                    break;
                case "js-section__home-intro":
                    theme.magnificVideo(),
                        $("body").data("anim-load") && (sr.reveal(e + " .home-intro", { distance: 0 }), sr.reveal(e + " .home-intro__media," + e + " .home-intro__text," + e + " .home-intro__video," + e + " .home-intro__link-wrap"));
                    break;
                case "js-section__home-promo":
                    theme.magnificVideo(), $("body").data("anim-load") && sr.reveal(e + " .home-promo__box");
                    break;
                case "js-section__home-custom":
                    $("body").data("anim-load") && sr.reveal(e + " .home-custom__item", { interval: theme.intervalValue });
                    break;
                case "js-section__home-html":
                    $("body").data("anim-load") && sr.reveal(e + " .home-html", { distance: 0 });
                    break;
                case "js-section__rich-text":
                    $("body").data("anim-load") && sr.reveal(e + " .home-rich-text__content", { distance: 0 });
                    break;
                case "js-section__home-map":
                    $(".js-map-replace").appendAround(), theme.homeMaps(), $("body").data("anim-load") && sr.reveal(e + " .home-map__items");
                    break;
                case "js-section__home-delivery":
                    $("body").data("anim-load") && (sr.reveal(e + " .home-delivery", { distance: 0 }), sr.reveal(e + " .home-delivery__content", { distance: theme.intervalStyle }));
                    break;
                case "js-section__home-inline":
                    $("body").data("anim-load") && sr.reveal(e + " .home-inline__item", { interval: theme.intervalValue });
                    break;
                case "js-section__home-collection-list":
                    theme.layoutSlider(".js-layout-slider-" + d), $("body").data("anim-load") && sr.reveal(e + " .collection-list__item", { interval: theme.intervalValue });
                    break;
                case "js-section__home-product":
                    "true" != $(this).find(".section").attr("data-section-onboarding") && theme.productSelect(d, "featured", !1),
                        theme.selectWrapper(),
                        theme.runAjaxCart(),
                        theme.homeProductMediaInit(),
                        $(".js-product-slider").hide(),
                        $(".js-product-slider-spinner").show(),
                        $(".js-product-slider").imagesLoaded(function () {
                            $(".js-product-slider").show(), $(".js-product-slider-spinner").hide(), theme.homeFeaturedProduct();
                        }),
                        $("body").data("anim-load") && (sr.reveal(e + " .product-featured__details", { distance: 0 }), sr.reveal(e + " .product-featured__photo-wrapper", { distance: 0, delay: 500 }));
                    break;
                case "js-section__product-single":
                    theme.scrollToFixedProductSingle(),
                        theme.selectWrapper(),
                        theme.accordion(),
                        theme.runAjaxCart(),
                        theme.productSelect("1", "single", !0),
                        theme.selectWrapper(),
                        theme.productMediaInit(),
                        $(".js-product-slider").imagesLoaded(function () {
                            theme.thumbsCarousel();
                        }),
                        $(".js-cart-replace").appendAround(),
                        $("body").data("anim-load") &&
                            (sr.reveal(".product-single__title-text", { distance: "20px" }),
                            sr.reveal(".product-single__title-desc, .breadcrumb, .product-single__photos, .product-single__content, .product-single--minimal .product-single__content-text", { distance: 0, delay: 500 }));
                    break;
                case "js-section__product-testimonials":
                    theme.testimonialsCarousel(), $("body").data("anim-load") && sr.reveal(e + " .home-testimonials", { distance: 0 });
                    break;
                case "js-section__product-custom":
                    $("body").data("anim-load") && (sr.reveal(".home-custom__item", { interval: theme.intervalValue }), sr.reveal(".home-image-grid__item", { interval: theme.intervalValue }));
                    break;
                case "js-section__product-related":
                    theme.productRecommendations();
                    break;
                case "js-section__blog":
                    theme.masonryLayout(),
                        theme.layoutSlider(".js-layout-slider-" + d),
                        theme.productCollSwatch(),
                        $("body").data("anim-load") &&
                            (sr.reveal(".blog", { delay: 500, interval: theme.intervalValue }),
                            sr.reveal(".blog-page__tags, .blog-pagination", { distance: 0, delay: 500 }),
                            sr.reveal(".blog-page .section__title", { distance: "20px" }),
                            sr.reveal(".product-top", { interval: theme.intervalValue }));
                    break;
                case "js-section__article":
                    theme.masonryLayout(),
                        theme.layoutSlider(".js-layout-slider-" + d),
                        theme.productCollSwatch(),
                        $("body").data("anim-load") &&
                            (sr.reveal(".article .section__title", { distance: "20px" }),
                            sr.reveal(".article__date", { distance: "-10px", delay: 500 }),
                            sr.reveal(".article__featured-media, .article__content", { distance: 0, delay: 200 }),
                            sr.reveal(".article__meta, .article-paginate", { distance: 0 }),
                            sr.reveal(".product-top", { interval: theme.intervalValue }));
                    break;
                case "js-section__header":
                    theme.scrollToFixedHeader(), theme.headerNav(), theme.triggerActive(), theme.localizeToggle(), theme.headerScrollUp();
                    break;
                case "js-section__newsletter":
                    $("body").data("anim-load") && sr.reveal(e + " .newsletter", { distance: 0 });
                    break;
                case "js-section__footer":
                    theme.footerTweet(), theme.localizeToggle(), $("body").data("anim-load") && sr.reveal(e + " .newsletter", { distance: 0 });
                    break;
                case "js-section__collection":
                    theme.selectWrapper(),
                        theme.masonryLayout(),
                        theme.collectionSort(),
                        theme.productCollSwatch(),
                        $("body").data("anim-load") &&
                            (sr.reveal(".collection__header-info__title", { distance: "20px" }),
                            sr.reveal(".collection .product-top", { interval: theme.intervalValue, delay: 500 }),
                            sr.reveal(".collection__header-media, .collection__header-info__text, .collection-main__sort, .collection-empty, .collection-pagination", { distance: 0, delay: 500 }));
                    break;
                case "js-section__list-collections":
                    $("body").data("anim-load") && (sr.reveal(".list-collections .section__title", { distance: "20px" }), sr.reveal(".list-collections .collection-list__item", { interval: theme.intervalValue, delay: 500 }));
                    break;
                case "js-section__mobile-draw":
                    theme.triggerActive(), theme.localizeToggle();
                    break;
                case "js-section__promo-pop":
                    $("body").data("anim-load") && sr.reveal(".promo-pop .section__title", { distance: 0 });
                    break;
                case "js-section__faq-page":
                    theme.accordion(),
                        theme.scrollToFixedFaq(),
                        theme.scrollToDiv(),
                        $("body").data("anim-load") &&
                            (sr.reveal(".page .section__title", { distance: "20px" }),
                            sr.reveal(".faq__cta", { distance: 0, delay: 500 }),
                            sr.reveal(".faq__search", { distance: 0, delay: 700 }),
                            sr.reveal(".faq__accordion", { distance: 0, delay: 900 }),
                            sr.reveal(".page__contact-form", { distance: 0, delay: 200 }),
                            sr.reveal(".faq__category__title", { distance: 0 }));
                    break;
                case "js-section__page-custom":
                    $("body").data("anim-load") && (sr.reveal(".home-custom__item", { interval: theme.intervalValue }), sr.reveal(".home-image-grid__item", { interval: theme.intervalValue }));
                    break;
                case "js-section__page-contact":
                    $(".js-map-replace").appendAround(), theme.homeMaps(), $("body").data("anim-load") && (sr.reveal(e + " .home-map__items"), sr.reveal(".page__contact-form", { distance: 0, delay: 200 }));
            }
        })
        .on("shopify:section:reorder", function (a) {
            theme.homeSectionMargin();
        })
        .on("shopify:section:select", function (a) {
            var b = $(a.target),
                c = b.attr("class").replace("shopify-section", "").trim(),
                d = a.originalEvent.detail.sectionId;
            switch (c) {
                case "js-section__mobile-draw":
                    (theme.currentOffset = $(document).scrollTop()), theme.mfpOpen("menu-draw");
                    break;
                case "js-section__age-checker":
                    $(b).find(".js-age-draw").data("age-check-enabled") ? theme.mfpOpen("age") : $.magnificPopup.close(), (theme.currentOffset = $(document).scrollTop());
                    break;
                case "js-section__promo-pop":
                    $(b).find(".js-promo-pop").data("promo-enabled") ? theme.promoPop("open") : theme.promoPop("close"), (theme.currentOffset = $(document).scrollTop());
                    break;
                case "js-section__home-slider":
                    $('[data-section-id="' + d + '"]')
                        .find(".js-home-carousel")
                        .slick("slickPause");
                    break;
                case "js-section__home-testimonials":
                    $('[data-section-id="' + d + '"]')
                        .find(".js-home-testimonials-carousel")
                        .slick("slickPause");
                    break;
                case "js-section__product-testimonials":
                    $('[data-section-id="' + d + '"]')
                        .find(".js-home-testimonials-carousel")
                        .slick("slickPause");
            }
        })
        .on("shopify:section:deselect", function (a) {
            var b = $(a.target),
                c = b.attr("class").replace("shopify-section", "").trim(),
                d = a.originalEvent.detail.sectionId;
            switch (c) {
                case "js-section__mobile-draw":
                case "js-section__age-checker":
                    $(document).scrollTop(theme.currentOffset), $.magnificPopup.close();
                    break;
                case "js-section__promo-pop":
                    theme.promoPop("close"), $(document).scrollTop(theme.currentOffset);
                    break;
                case "js-section__home-slider":
                    var e = $('[data-section-id="' + d + '"]').find(".js-home-carousel");
                    e.data("autoplay") && e.slick("slickPlay");
                    break;
                case "js-section__home-testimonials":
                    var f = $('[data-section-id="' + d + '"]').find(".js-home-testimonials-carousel");
                    f.data("autoplay") && f.slick("slickPlay");
                    break;
                case "js-section__product-testimonials":
                    var g = $('[data-section-id="' + d + '"]').find(".js-home-testimonials-carousel");
                    g.data("autoplay") && g.slick("slickPlay");
            }
        })
        .on("shopify:block:select", function (a) {
            var b = a.originalEvent.detail.sectionId,
                c = $(a.target);
            switch (c.parents(".shopify-section").attr("class").replace("shopify-section", "").trim()) {
                case "js-section__home-slider":
                    var d = $(c).find(".home-carousel__item").attr("data-slide-id");
                    $('[data-section-id="' + b + '"]')
                        .find(".js-home-carousel")
                        .slick("slickGoTo", d);
                    break;
                case "js-section__home-testimonials":
                    var e = $(c).find(".home-testimonials__item").attr("data-slide-id");
                    $('[data-section-id="' + b + '"]')
                        .find(".js-home-testimonials-carousel")
                        .slick("slickGoTo", e);
                    break;
                case "js-section__product-testimonials":
                    var f = $(c).find(".home-testimonials__item").attr("data-slide-id");
                    $('[data-section-id="' + b + '"]')
                        .find(".js-home-testimonials-carousel")
                        .slick("slickGoTo", f);
            }
        }),
    "undefined" == typeof Shopify && (Shopify = {}),
    Shopify.formatMoney ||
        (Shopify.formatMoney = function (a, b) {
            function c(a, b) {
                return void 0 === a ? b : a;
            }
            function d(a, b, d, e) {
                if (((b = c(b, 2)), (d = c(d, ",")), (e = c(e, ".")), isNaN(a) || null === a)) return 0;
                a = (a / 100).toFixed(b);
                var f = a.split(".");
                return f[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + d) + (f[1] ? e + f[1] : "");
            }
            var e = "",
                f = /\{\{\s*(\w+)\s*\}\}/,
                g = b || this.money_format;
            switch (("string" == typeof a && (a = a.replace(".", "")), g.match(f)[1])) {
                case "amount":
                    e = d(a, 2);
                    break;
                case "amount_no_decimals":
                    e = d(a, 0);
                    break;
                case "amount_with_comma_separator":
                    e = d(a, 2, ".", ",");
                    break;
                case "amount_no_decimals_with_comma_separator":
                    e = d(a, 0, ".", ",");
            }
            return g.replace(f, e);
        }),
    (function () {
        var a = window.navigator.userAgent,
            b = a.indexOf("MSIE ");
        if ((b > 0 && (parseInt(a.substring(b + 5, a.indexOf(".", b)), 10), (document.querySelector("html").className += " ie11")), a.indexOf("Trident/") > 0)) {
            var c = a.indexOf("rv:");
            parseInt(a.substring(c + 3, a.indexOf(".", c)), 10), (document.querySelector("html").className += " ie11");
        }
    })();
