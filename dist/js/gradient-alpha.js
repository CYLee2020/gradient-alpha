(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.gradient = void 0;
var _exports = {
    linear: function (img, angel, stops, alphas) {
        if (angel === void 0) { angel = 90; }
        if (stops === void 0) { stops = [0, 1]; }
        if (stops.length < 2) {
            return img;
        }
        angel = angel % 360;
        var imageData, canvas = null;
        if (img instanceof Image) {
            var res = this.getImageData(img);
            imageData = res.imageData;
            canvas = res.canvas;
        }
        else {
            imageData = img;
        }
        var width = imageData.width;
        var height = imageData.height;
        stops.forEach(function (item, index) {
            if (typeof item == 'number') {
                stops[index] = [item, index];
            }
        });
        stops.forEach(function (item, index) {
            if (typeof item[1] == 'string') {
                if (item[1].indexOf('%') > 0) {
                    item[1] = item[1].replace('%', '');
                }
                item[1] = parseFloat(item[1]) / 100;
            }
        });
        var maxLen = Math.min(Math.abs(width / Math.sin(angel / 180 * Math.PI)), Math.abs(height / Math.cos(angel / 180 * Math.PI)));
        if (angel == 90 || angel == 270) {
            maxLen = width;
        }
        if (angel == 0 || angel == 180) {
            maxLen = height;
        }
        stops = stops;
        var xo = 0, yo = 0;
        if (angel < 90 || angel > 270) {
            yo = height - 1;
        }
        if (angel > 180) {
            xo = width - 1;
        }
        var initAngel = Math.abs(Math.PI / 2 - angel % 180 / 180 * Math.PI);
        for (var y0 = 0; y0 < height; y0++) {
            var rowIndex = y0 * width * 4;
            var y = y0;
            var ypow = Math.pow(y0 - yo, 2);
            if (angel < 90 || angel > 270) {
                y = (height) - y0;
            }
            for (var x0 = 0; x0 < width; x0++) {
                var x = x0;
                if (angel > 180) {
                    x = width - x0;
                }
                var len = Math.sqrt(Math.pow(x0 - xo, 2) + ypow);
                var atan = Math.atan(x / y);
                var len1 = len * Math.abs(Math.sin(initAngel + atan));
                var aIndex = rowIndex + x0 * 4 + 3;
                var alpha = alphas ? alphas[y0 * width + x0] : imageData.data[aIndex];
                var len_c = len1 / maxLen;
                for (var i = 1, l = stops.length; i < l; i++) {
                    var start = stops[i - 1][0];
                    var pos_end = stops[i][1];
                    var gap = stops[i][0] - stops[i - 1][0];
                    var pos_start = stops[i - 1][1];
                    var length_1 = stops[i][1] - stops[i - 1][1];
                    if (len_c < pos_start) {
                        imageData.data[aIndex] = Math.floor(alpha * start);
                        break;
                    }
                    else if (len_c > pos_end) {
                        if (i == l - 1) {
                            imageData.data[aIndex] = Math.floor(alpha * stops[i][0]);
                        }
                        continue;
                    }
                    else {
                        var a = (start + (len_c - pos_start) / length_1 * gap);
                        imageData.data[aIndex] = Math.floor(alpha * a);
                        break;
                    }
                }
            }
        }
        if (img instanceof ImageData) {
            return imageData;
        }
        else {
            if (canvas) {
                var cxt = canvas.getContext('2d');
                cxt.putImageData(imageData, 0, 0);
                return canvas;
            }
            else {
                return img;
            }
        }
    },
    convertImageData2Canvas: function (imageData) {
        var canvas = document.createElement('canvas');
        var cxt = canvas.getContext('2d');
        canvas.width = imageData.width;
        canvas.height = imageData.height;
        cxt.putImageData(imageData, 0, 0);
        return canvas;
    },
    getImageData: function (img) {
        var canvas = document.createElement('canvas');
        var cxt = canvas.getContext('2d');
        if (img instanceof Image) {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            cxt.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
        else {
            canvas.width = img.width;
            canvas.height = img.height;
            cxt.putImageData(img, 0, 0);
        }
        return { imageData: cxt.getImageData(0, 0, canvas.width, canvas.height), canvas: canvas };
    },
    getAlphas: function (img) {
        var alphas = [];
        for (var y = 0; y < img.height; y++) {
            var index = y * img.width * 4;
            for (var x = 0; x < img.width; x++) {
                alphas.push(img.data[index + x * 4 + 3]);
            }
        }
        return alphas;
    }
};
exports.default = _exports;
exports.gradient = _exports;


/***/ })
/******/ ]);
});