"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _exports = {
    linear: function (img, angel, stop) {
        if (angel === void 0) { angel = 90; }
        if (stop === void 0) { stop = [0, 1]; }
        var imageData = this.getImageData(img);
        var x = Math.sin(angel / 180 * Math.PI);
        var y = Math.cos(angel / 180 * Math.PI);
        var width = imageData.width;
        var height = imageData.height;
        console.log(imageData);
        for (var m = 0; m < height; m++) {
            var rowIndex = m * width * 4;
            var yi = m / height;
            for (var n = 0; n < width; n++) {
                var xi = n / width;
                var a = xi * x + yi * y;
                imageData.data[rowIndex + n * 4 + 3] = imageData.data[rowIndex + n * 4 + 3] * a;
            }
        }
        var canvas = document.createElement('canvas');
        var cxt = canvas.getContext('2d');
        cxt.putImageData(imageData, 0, 0);
        document.body.appendChild(canvas);
    },
    getImageData: function (img) {
        var canvas = document.createElement('canvas');
        var cxt = canvas.getContext('2d');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        cxt.drawImage(img, 0, 0, canvas.width, canvas.height);
        return cxt.getImageData(0, 0, canvas.width, canvas.height);
    }
};
exports.default = _exports;
exports.gradient = _exports;
