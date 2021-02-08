/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/assets/src/js/app.js":
/***/ (function(module, exports) {

jQuery.fn.extend({
    exists: function exists() {
        return this.length > 0 ? true : false;
    }
});
$(function () {
    var isProduct = $("#product-page").exists();
    if (isProduct) {
        var listOfReservedDates = window.reserved;
        var maxAdult = $('#product-page').data('maxAdults');
        var maxChildren = $('#product-page').data('maxChildren');

        $('.room-slider').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            draggable: false,
            arrows: false
        });
        $('.room-slider-nav').slick({
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            speed: 500,
            asNavFor: '.room-slider',
            slide: '.room-slider-nav-image',
            focusOnSelect: true,
            prevArrow: $("#room-slider-prev"),
            nextArrow: $("#room-slider-next")
        });

        var fromDateConfig = {
            defaultDate: "2020-01-01",
            disable: listOfReservedDates,
            dateFormat: "Y-m-d",
            allowInput: true,
            locale: {
                firstDayOfWeek: 1
            },
            onChange: function onChange() {
                for (var i = 0; i < listOfReservedDates.length; i++) {
                    if (new Date(listOfReservedDates[i]).getTime() > new Date(fromDate.selectedDates[0]).getTime()) {
                        toDate.set("maxDate", listOfReservedDates[i]);
                        toDate.set("minDate", fromDate.selectedDates[0]);
                        toDate.jumpToDate(fromDate.selectedDates[0]);
                        break;
                    } else {
                        toDate.set("maxDate", null);
                        toDate.set("minDate", fromDate.selectedDates[0]);
                        toDate.jumpToDate(fromDate.selectedDates[0]);
                    }
                }
            }
        };
        var toDateConfig = {
            disable: listOfReservedDates,
            dateFormat: "Y-m-d",
            allowInput: true,
            locale: {
                firstDayOfWeek: 1
            }
        };
        var fromDate = $("#fromDate").flatpickr(fromDateConfig);
        var toDate = $("#toDate").flatpickr(toDateConfig);

        $(".minus").on("click", function (event) {
            var $input = $(event.currentTarget).parent().parent().find(".guests-number").find(".number");
            if (parseInt($input.val()) <= 0) {
                return;
            }
            var count = parseInt($input.val()) - 1;
            if ($input.attr("id") === "adult") {
                count = count < 1 ? 1 : count;
            }
            $input.val(count);
            return;
        });
        $(".plus").on("click", function (event) {
            var $input = $(event.currentTarget).parent().parent().find(".guests-number").find(".number");
            var count = parseInt($input.val());
            if ($input.attr("id") === "adult") {
                if (count < maxAdult) {
                    $input.val(parseInt($input.val()) + 1);
                    return;
                }
            }
            if (count < maxChildren) {
                $input.val(parseInt($input.val()) + 1);
                return;
            }
        });

        var limit = 500;
        $("#textarea").attr("maxlength", limit);
        $("#textarea").on("keyup", function (event) {
            if ($(event.currentTarget).val().length > limit) {
                return;
            }
            $("#count").text($(event.currentTarget).val().length + "/" + limit);
        });
        $("#textarea").on("keydown", function (event) {
            if ($(event.currentTarget).val().length > limit) {
                return;
            }
            $("#count").text($(event.currentTarget).val().length + "/" + limit);
        });
    } else {
        $('.slider').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: true,
            speed: 500,
            slide: ".card",
            prevArrow: $("#home-banner-prev"),
            nextArrow: $("#home-banner-next")
        });
        $('.news-slider').slick({
            infinite: true,
            autoplay: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            slide: ".card",
            speed: 500,
            prevArrow: $("#news-carousel-prev"),
            nextArrow: $("#news-carousel-next")
        });
        $('.reviews').slick({
            infinite: true,
            autoplay: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            slide: ".review",
            dots: true,
            speed: 500,
            prevArrow: $("#guest-reviews-prev"),
            nextArrow: $("#guest-reviews-next")
        });
    }
});

/***/ }),

/***/ "./resources/assets/src/scss/main.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./resources/assets/src/js/app.js");
module.exports = __webpack_require__("./resources/assets/src/scss/main.scss");


/***/ })

/******/ });