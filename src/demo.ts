import {gradient} from './index';
import imgSrc from './img2.jpeg';
function load(){
    console.log(imgSrc)
    let img=new Image();
    img.onload=function(){
        gradient.linear(img,45,[[1,"0%"],[0,'50%'],[1,'100%']]);  
    }
    img.src=imgSrc;
    document.body.appendChild(img)
}
load();