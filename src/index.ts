let _exports = {
    /**
 *
 *
 * @param {HTMLImageElement} img
 * @param {number} angel
 * @param {number[]} stop;range[0,1]
 */
    linear(img: HTMLImageElement, angel: number = 90, stop: number[]|Array<[number,number|string]>=[0, 1]){
        if(stop.length<2){
            return;
        }
        let imageData = this.getImageData(img);
        let x = Math.sin(angel / 180 * Math.PI);
        let y = -Math.cos(angel / 180 * Math.PI);
        let width = imageData.width;
        let height = imageData.height;
        stop.forEach((item:number|[number,number|string],index:number)=>{
            if( typeof item=='number' ){
                stop[index]=[item,index];
            }
        });
        (stop as any).forEach((item:[number,number|string],index:number)=>{
            if( typeof item[1]=='string' ){
               if(item[1].indexOf('%')>0){
                item[1]=item[1].replace('%','');
                item[1]=parseFloat(item[1])/100;
               }
            }
        });
        stop=stop as  [number,number][];
            for (let m = 0; m < height; m++) {
                let rowIndex=m*width*4;
                let yi=m/(height-1);
                if(angel<90 || angel>270){
                    yi=1-yi;
                }
                for (let n = 0; n< width; n++) {

                    for(let i=1,l=stop.length;i<l;i++){
                        let start=stop[i-1][0];
                        let pos_end=stop[i][1] as number;
                        let gap=stop[i][0]-stop[i-1][0];
                        let pos_start=stop[i-1][1] as number;
                        let length=<number>stop[i][1]-<number>stop[i-1][1];
                        let xi=n/(width-1);
                        if(angel>180){
                            xi=1-xi;
                        }
                        
                        if(Math.sqrt(Math.pow(xi*x,2)+Math.pow(yi*y,2))<pos_start){ 
                            imageData.data[rowIndex+n*4+3]*=start;
                            break;
                        }else if( Math.sqrt(Math.pow(xi*x,2)+Math.pow(yi*y,2))>pos_end){
                            if(i==l-1){
                                imageData.data[rowIndex+n*4+3]*=stop[i][0];
                            }
                            continue;
                        }else{
                            
                           
                            let yii=(yi-pos_start)/length;
                            let xii=(xi-pos_start)/length;
                           
                            let a=(start+(Math.sqrt(Math.pow(xii*x,2)+Math.pow(yii*y,2)))*gap);
                            imageData.data[rowIndex+n*4+3]=imageData.data[rowIndex+n*4+3]*a;
                            break;
                        }
                        
                    }    
                
            }
        }
        
        let canvas = document.createElement('canvas');
        canvas.width=imageData.width;
        canvas.height=imageData.height;
        let cxt = canvas.getContext('2d');
        cxt!.putImageData(imageData,0,0);
        document.body.appendChild(canvas);

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