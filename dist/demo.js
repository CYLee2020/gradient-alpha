"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var img2_jpeg_1 = require("./img2.jpeg");
function load() {
    var img = new Image();
    img.onload = function () {
        var imageData = index_1.gradient.getImageData(img);
        function a() {
            for (var i = 0; i < 360; i += 10) {
                var canvas = document.createElement('canvas');
                document.body.appendChild(canvas);
                var cxt = canvas.getContext('2d');
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                var newImage = index_1.gradient.linear(imageData, i, [[0, "0"], [0.3, "50%"], [1, "100%"]]);
                cxt.putImageData(newImage, 0, 0);
            }
        }
        a();
    };
    img.src = img2_jpeg_1.default;
}
load();
