import {ReactElement, useEffect} from "react";
import {ContextMenu} from "./innerClass";



export function useContextMenu(target:string|HTMLElement|null,body:ReactElement){
    useEffect(()=>{

        let d:HTMLElement|null;
        if(target instanceof HTMLElement){
            d=target;
        }else{
            d=document.getElementById(target as string)
            if(!d){
                throw new Error(" bsr-contextMenu. Found HTMLElement by id is null :"+target)
            }
        }
        const innerClass=new ContextMenu({target:d!,body:body})
        return ()=>{
            innerClass.ContextMenuWillUnmount()
        }
    },[])
    return null;
}
