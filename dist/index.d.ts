declare let _exports: {
    linear<T extends HTMLImageElement | ImageData>(img: T, angel?: number, stops?: number[] | [number, string | number][], alphas?: number[] | undefined): T;
    convertImageData2Canvas(imageData: ImageData): HTMLCanvasElement;
    getImageData(img: HTMLImageElement | ImageData): {
        imageData: ImageData;
        canvas: HTMLCanvasElement;
    };
    getAlphas(img: ImageData): number[];
};
export default _exports;
export declare let gradient: {
    linear<T extends HTMLImageElement | ImageData>(img: T, angel?: number, stops?: number[] | [number, string | number][], alphas?: number[] | undefined): T;
    convertImageData2Canvas(imageData: ImageData): HTMLCanvasElement;
    getImageData(img: HTMLImageElement | ImageData): {
        imageData: ImageData;
        canvas: HTMLCanvasElement;
    };
    getAlphas(img: ImageData): number[];
};
