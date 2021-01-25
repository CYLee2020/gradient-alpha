"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _exports = {
    linear: function (img, angel, stops) {
        if (angel === void 0) { angel = 90; }
        if (stops === void 0) { stops = [0, 1]; }
        if (stops.length < 2) {
            return img;
        }
        angel = angel % 360;
        var imageData = this.getImageData(img);
        var tan = Math.tan(angel / 180 * Math.PI);
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
        var mx1 = width, my1 = mx1 / tan;
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
        for (var y0 = 0; y0 < height; y0++) {
            var rowIndex = y0 * width * 4;
            var y = y0;
            for (var x0 = 0; x0 < width; x0++) {
                var x = x0;
                if (angel < 90 || angel > 270) {
                    y = (height) - y0;
                }
                if (angel > 180) {
                    x = width - x0;
                }
                var len = Math.sqrt(Math.pow(x0 - xo, 2) + Math.pow(y0 - yo, 2));
                var atan = Math.atan(x / y);
                var angel2 = Math.abs(Math.PI / 2 - angel % 180 / 180 * Math.PI) + atan;
                var len1 = len * Math.abs(Math.sin(angel2));
                for (var i = 1, l = stops.length; i < l; i++) {
                    var start = stops[i - 1][0];
                    var pos_end = stops[i][1];
                    var gap = stops[i][0] - stops[i - 1][0];
                    var pos_start = stops[i - 1][1];
                    var length_1 = stops[i][1] - stops[i - 1][1];
                    var len_c = len1 / maxLen;
                    if (len_c < pos_start) {
                        imageData.data[rowIndex + x0 * 4 + 3] *= start;
                        break;
                    }
                    else if (len_c > pos_end) {
                        if (i == l - 1) {
                            imageData.data[rowIndex + x0 * 4 + 3] *= stops[i][0];
                        }
                        continue;
                    }
                    else {
                        var a = (start + (len_c - pos_start) / length_1 * gap);
                        imageData.data[rowIndex + x0 * 4 + 3] = Math.floor(imageData.data[rowIndex + x0 * 4 + 3] * a);
                        break;
                    }
                }
            }
        }
        if (img instanceof Image) {
            var canvas = document.createElement('canvas');
            canvas.width = imageData.width;
            canvas.height = imageData.height;
            var cxt = canvas.getContext('2d');
            cxt.putImageData(imageData, 0, 0);
            return canvas;
        }
        else {
            return imageData;
        }
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
        return cxt.getImageData(0, 0, canvas.width, canvas.height);
    }
};
exports.default = _exports;
exports.gradient = _exports;
