import React, {useEffect, useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import {useContextMenu} from "./context/contextMenu";


export function body(){
    return(
        <div>
            <p>Apollo astronauts:</p>
            <ul>
                <li>Neil Armstrong</li>
                <li>Alan Bean</li>
                <li>Peter Conrad</li>
                <li>Edgar Mitchell</li>
                <li>Alan Shepard</li>
            </ul>
        </div>
    )
}


function App() {
    useContextMenu("22",body(),)

  return (
    <div className="App">
       <div id={"22"} style={{width:100,height:100,background:"black",marginTop:600}} >
      </div>
    </div>
  );
}

export default App;
