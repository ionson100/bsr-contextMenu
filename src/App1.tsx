import React from 'react';
import './App.css';
import {ContextMenu} from "./context/innerClass";

class App1 extends React.Component<any, any> {
    private mRevDiv=React.createRef<HTMLButtonElement>();
    private menu?:ContextMenu
    constructor(props: Readonly<any>) {
        super(props);

    }
    componentDidMount() {
      this.menu=new ContextMenu({target:this.mRevDiv.current!, body:<div>aass</div>})
    }


    render() {
        return (
            <div className="App">

                <button ref={this.mRevDiv} id={'333'} style={{width: 100, height: 100, background: "black"}}>

                </button>
            </div>
        );
    }


}

export default App1;
