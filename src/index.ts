let _exports = {
    /**
 *
 *
 * @param {HTMLImageElement} img
 * @param {number} angel
 * @param {number[]} stop;range[0,1]
 */
    linear< T extends HTMLImageElement|ImageData>(img:T, angel: number = 90, stop: number[] | Array<[number, number | string]> = [0, 1]):T{
        if (stop.length < 2) {
            return img;
        }
        angel=angel%360;
        let imageData:ImageData;
        if(img instanceof Image){
            imageData = this.getImageData(img);
        }else{
            imageData=img as ImageData;
        }
        
        let tan = Math.tan(angel / 180 * Math.PI);
        let width = imageData.width;
        let height = imageData.height;
        stop.forEach((item: number | [number, number | string], index: number) => {
            if (typeof item == 'number') {
                stop[index] = [item, index];
            }
        });
        (stop as any).forEach((item: [number, number | string], index: number) => {
            if (typeof item[1] == 'string') {
                if (item[1].indexOf('%') > 0) {
                    item[1] = item[1].replace('%', '');
                    item[1] = parseFloat(item[1]) / 100;
                }
            }
        });

        let mx1 = width, my1 = mx1 / tan;
        let my2 = height, mx2 = my2 * tan;
        let maxLen = Math.min(Math.sqrt(Math.pow(mx1, 2) + Math.pow(my1, 2)), Math.sqrt(Math.pow(my2, 2) + Math.pow(mx2, 2)))
        stop = stop as [number, number][];

        let xo=0,yo=0;

        if(angel<90 || angel>270){
            yo=height-1;
           
        }
        if(angel>180){
            xo=width-1;
           
        }
        for (let y0 = 0; y0 < height; y0++) {
            let y = y0;
            let rowIndex = y * width * 4;
            
            for (let x0 = 0; x0 < width; x0++) {
                
                let x = x0;
            
              
                let x1 = x;
               

                let y1 =x1 / tan;
                
                
                if(angel<90){
                    y1=(height-1)-y1;
                }else if(angel<180){
                    y1=Math.abs(y1);
                }else if(angel<270){
                    y1=Math.abs((width-1-x1) / tan);
                }else if(angel<360){
                    y1=(height-1)-Math.abs((width-1-x1) / tan);
                }

                if(angel%180==0){
                    y1=y;
                    x1=0;
                }
                if(angel==270){
                    x1=x;
                    y1=0;
                }
               
                
                let len = Math.sqrt(Math.pow(x1-xo, 2) + Math.pow(y1-yo, 2));
                let len4= Math.sqrt(Math.pow(x0-xo, 2) + Math.pow(y0-yo, 2));

                let len1 = Math.sqrt(Math.pow(x1 - x, 2) + Math.pow(y1 - y, 2));


                let len2 =Math.abs(Math.sin(Math.PI/2- angel / 180 * Math.PI) * len1)

                if(angel%180==0){
                    len2=0;
                }

                let len3 =len + len2;
                
                if(len>len4){
                    len3=len-len2;
                }
               
               
                for (let i = 1, l = stop.length; i < l; i++) {
                    let start = stop[i - 1][0];
                    let pos_end = stop[i][1] as number;
                    let gap = stop[i][0] - stop[i - 1][0];
                    let pos_start = stop[i - 1][1] as number;
                    let length = <number>stop[i][1] - <number>stop[i - 1][1];

                    let len_c =len3 / maxLen;
                    
                    
                    if (len_c < pos_start) {
                        imageData.data[rowIndex + x0 * 4 + 3] *= start;
                        break;
                    } else if (len_c > pos_end) {
                        if (i == l - 1) {
                            imageData.data[rowIndex + x0 * 4 + 3] *= stop[i][0];
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
    getImageData(img: HTMLImageElement) {
        let canvas = document.createElement('canvas');
        let cxt = canvas.getContext('2d');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        cxt!.drawImage(img, 0, 0, canvas.width, canvas.height);
        return cxt!.getImageData(0, 0, canvas.width, canvas.height);
    }
}
export default _exports;
export let gradient = _exports;