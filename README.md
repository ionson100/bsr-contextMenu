# bsr-context-menu

> React component context menu

[![NPM](https://img.shields.io/npm/v/bsr-context-menu.svg)](https://www.npmjs.com/package/bsr-context-menu) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save bsr-context-menu
```

## Usage

```tsx
import React, {useRef} from 'react';
import {useContextMenu} from 'bsr-context-menu';
import 'bsr-context-menu/dist/index.css'


function Body(text:string){
    return(
        <div style={{width:200,cursor:'pointer'}}>
            <div>{text}:1</div>
            <div>{text}:2</div>
            <div>{text}:3</div>
            <div>{text}:4</div>
        </div>
    )
}

export function P10_1(){
    const mRefMenu=useRef(null);
    useContextMenu(mRefMenu,Body('Menu'))
    return <div ref={mRefMenu}  style={{width:100,height:100,background:'grey'}}/>
}
```

## License

MIT © [ionson100](https://github.com/ionson100)



[Examples, Help pages](https://ionson100.github.io/wwwroot/index.html#page=10-1).
