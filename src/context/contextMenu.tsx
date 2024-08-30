import {ReactElement, useEffect, useState} from "react";
import {InnerClass} from "./innerClass";



export function useContextMenu(target:string|HTMLElement|null,body:ReactElement){
    useEffect(()=>{
        let d:HTMLElement|null;
        if(target instanceof HTMLElement){
            d=target;
        }else{
            d=document.getElementById(target as string)
        }
        const innerClass=new InnerClass({target:d!,body:body})
        return ()=>{
            innerClass.ContextMenuWillUnmount()
        }
    },[])
    return null;
}
