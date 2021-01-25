# curve utils

## Installation

```shell
npm install gradient-alpha --save
```

```html
<script src="js/gradient-alpha.js"></script>
```

# curve

## Features

generate ImageData or Canvas from Image or ImageData by alpha options;
生成新的渐变透明度图片或ImageData.


## Methonds

### `linear`:

```typescript
gradient.linear(img: ImageData|HTMLImageElement, angel: number = 90, stops: number[] | Array<[number, number | string]> = [0, 1]):  ImageData|HTMLImageElement;
```
#### `params`:
img:ImageData|HTMLImageElement;
angel:number;gradient direction,range[0,360];
stops:[[number,number|string]...];alpha  sections;like [[0,"0"],[1:"100%"]];frist param is alpha,second param is length(range[0,1] or range["0","100%"]);

```typescript
gradient.linear(new Image(),45,[[0,"0"],[0.3,"50%"],[1,"100%"]])
```