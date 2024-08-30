import React, {useEffect, useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import {useContextMenu} from "./context/contextMenu";
import {InnerClass} from "./context/innerClass";

class App1 extends React.Component<any, any> {
    private mRevDiv=React.createRef<HTMLDivElement>();
    private menu?:InnerClass
    constructor(props: Readonly<any>) {
        super(props);

    }
    componentDidMount() {
      this.menu=new InnerClass({target:this.mRevDiv.current!, body:<div>aass</div>})
    }


    render() {
        return (
            <div className="App">

                <div ref={this.mRevDiv} id={'333'} style={{width: 100, height: 100, background: "black"}}>

                </div>
            </div>
        );
    }


}

export default App1;
