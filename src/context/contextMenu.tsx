import {ReactElement, useEffect, useState} from "react";
import {InnerClass} from "./innerClass";

export function useContextMenu(idTarget:string,body:ReactElement){
    useEffect(()=>{
        const innerClass=new InnerClass({target:document.getElementById(idTarget)!,body:body})
        return ()=>{
            innerClass.ContextMenuWillUnmount()
        }
    },[])
    return null;
}
