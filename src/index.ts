let _exports = {
    /**
 *
 *
 * @param {HTMLImageElement} img
 * @param {number} angel
 * @param {number[]} stops;range[0,1]
 */
    linear< T extends HTMLImageElement|ImageData>(img:T, angel: number = 90, stops: number[] | Array<[number, number | string]> = [0, 1]):T{
        if (stops.length < 2) {
            return img;
        }
        angel=angel%360;
        let imageData = this.getImageData(img);
        let tan = Math.tan(angel / 180 * Math.PI);
        let width = imageData.width;
        let height = imageData.height;
        stops.forEach((item: number | [number, number | string], index: number) => {
            if (typeof item == 'number') {
                stops[index] = [item, index];
            }
        });
        (stops as any).forEach((item: [number, number | string], index: number) => {
            if (typeof item[1] == 'string') {
                if (item[1].indexOf('%') > 0) {
                    item[1] = item[1].replace('%', '');
                   
                }
                item[1] = parseFloat(item[1]) / 100;
            }
        });

        let mx1 = width, my1 = mx1 / tan;
        let maxLen = Math.min(Math.abs(width/Math.sin(angel/180*Math.PI)),Math.abs(height/Math.cos(angel/180*Math.PI)))
        if(angel==90 || angel==270){
            maxLen=width;
        }
        if(angel==0 || angel==180){
            maxLen=height;
        }
        stops = stops as [number, number][];

        let xo=0,yo=0;

        if(angel<90 || angel>270){
            yo=height-1;
           
        }
        if(angel>180){
            xo=width-1;
           
        }
        for (let y0 = 0; y0 < height; y0++) {
           
            let rowIndex = y0 * width * 4;
            
            let y = y0;
            for (let x0 = 0; x0 < width; x0++) {
                
                let x=x0;
                if(angel<90 || angel>270){
                    y=(height)-y0;
                }
                if(angel>180){
                    x=width-x0;
                }

                let len = Math.sqrt(Math.pow(x0-xo, 2) + Math.pow(y0-yo, 2));
                let atan=Math.atan(x/y);
                
                let angel2=Math.abs(Math.PI/2-angel%180/ 180 * Math.PI)+atan;

               
           
                let len1=len*Math.abs(Math.sin(angel2));
                
                
               
                for (let i = 1, l = stops.length; i < l; i++) {
                    let start = stops[i - 1][0];
                    let pos_end = stops[i][1] as number;
                    let gap = stops[i][0] - stops[i - 1][0];
                    let pos_start = stops[i - 1][1] as number;
                    let length = <number>stops[i][1] - <number>stops[i - 1][1];

                    let len_c =len1 / maxLen;
                    
                    
                    if (len_c < pos_start) {
                        imageData.data[rowIndex + x0 * 4 + 3] *= start;
                        break;
                    } else if (len_c > pos_end) {
                        if (i == l - 1) {
                            imageData.data[rowIndex + x0 * 4 + 3] *= stops[i][0];
                        }
                        continue;
                    } else {
                        let a = (start + (len_c - pos_start) / length * gap);
                      
                        imageData.data[rowIndex + x0 * 4 + 3] = Math.floor(imageData.data[rowIndex + x0 * 4 + 3] * a);
                        break;
                    }

                }
            }
        }
        if(img instanceof Image){
            let canvas = document.createElement('canvas');
            canvas.width = imageData.width;
            canvas.height = imageData.height;
            let cxt = canvas.getContext('2d');
            cxt!.putImageData(imageData, 0, 0);
            return canvas as unknown as T;
        }else{
            return imageData  as T;
        }
        
        
    },
    getImageData(img: HTMLImageElement|ImageData) {
        let canvas = document.createElement('canvas');
        let cxt = canvas.getContext('2d');
        if(img instanceof Image){
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            cxt!.drawImage(img, 0, 0, canvas.width, canvas.height);
        }else{
            canvas.width = img.width;
            canvas.height = img.height;
            cxt!.putImageData(img, 0, 0);
        }
        return cxt!.getImageData(0, 0, canvas.width, canvas.height);
    }
}
export default _exports;
export let gradient = _exports;