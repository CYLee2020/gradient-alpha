## Installation

```shell
npm install gradient-alpha --save
```

```html
<script src="js/gradient-alpha.js"></script>
```

# gradient

## Features

generate ImageData or Canvas from Image or ImageData by alpha options;
生成新的渐变透明度图片或ImageData.


## Methonds

### `linear`:

```typescript
 gradient.linear< T extends HTMLImageElement|ImageData>(img:T, angel: number = 90, stops: number[] | Array<[number, number | string]> = [0, 1],alphas?:number[]):T
```
`img` - `ImageData|HTMLImageElement`;

`angel` - `number`;gradient direction,range:[0,360];

`stops` - `[[number,number|string]...]`;alpha  sections;like [[0,"0"],[1:"100%"]];frist param is alpha,second param is length(range[0,1] or range["0","100%"]);

#### `example`:
```typescript
gradient.linear(new Image(),45,[[0,"0"],[0.3,"50%"],[1,"100%"]])
```