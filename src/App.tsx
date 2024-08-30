import React, {useEffect, useRef} from 'react';

import './App.css';
import "./context/index.css"
import { TiThMenu } from "react-icons/ti";
import {ContextMenu} from "./context/innerClass";


export function body(){
    return(
        <div style={{width:200}}>
           <div className={'assa'} >
               <TiThMenu/> <div style={{paddingLeft:10}}>Menu1</div>
           </div>
            <div className={'assa'} >
                <TiThMenu/> <div style={{paddingLeft:10}}>Menu1</div>
            </div>
            <div className={'assa'} >
                <TiThMenu/> <div style={{paddingLeft:10}}>Menu1</div>
            </div>
            <div className={'assa'} >
                <TiThMenu/> <div style={{paddingLeft:10}}>Menu1</div>
            </div>


        </div>
    )
}


function App() {
    const mDiv=useRef<HTMLDivElement>(null)
    //useContextMenu("22",body(),)
    useEffect(()=>{
        const d=new ContextMenu({target:mDiv.current!,body:body()})
        return()=>{
            d.ContextMenuWillUnmount()
        }
    },[])

  return (
    <div >
       <div ref={mDiv} id={"22"} style={{width:"100%",height:1900,background:"white"}} >
      </div>
        {

        }
    </div>

  );
}

export default App;
