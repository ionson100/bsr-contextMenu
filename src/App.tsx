import React from 'react';

import './App.css';
import {useContextMenu} from "./context/contextMenu";
import "./context/index.css"


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
    <div >
       <div id={"22"} style={{width:"100%",height:1900,background:"white"}} >
      </div>
    </div>
  );
}

export default App;
