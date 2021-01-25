import { gradient } from './index';
import imgSrc from './img2.jpeg';
let canvas = document.createElement('canvas');
function load() {

    let img = new Image();
    img.onload = function () {

        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        let cxt = canvas.getContext('2d');
        let i = 0;
        let imageData=gradient.getImageData(img);
        function a() {
           if (i < 360) {
                let newImage = gradient.linear(imageData, i, [[1, 0.4], [0, 0.5], [0.3, 1]]);
                cxt!.putImageData(newImage,0,0);
                i++;
                setTimeout(a, 33)
            }
        }
        a();


    }
    img.src = imgSrc;

}
load();
document.body.appendChild(canvas);