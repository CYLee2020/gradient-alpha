import { gradient } from './index';
import imgSrc from './img2.jpeg';

function load() {

    let img = new Image();
    img.onload = function () {

        let imageData=gradient.getImageData(img);
       
        function a() {
           for(let i = 0;i<360;i+=10){
                let canvas = document.createElement('canvas');
                document.body.appendChild(canvas);
                let cxt = canvas.getContext('2d');
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                let newImage = gradient.linear(imageData, i, [[0,"0"],[0.3,"50%"],[1,"100%"]]);
                
                cxt!.putImageData(newImage,0,0);
            }
        }
        a();
    }
    img.src = imgSrc;
}
load();
