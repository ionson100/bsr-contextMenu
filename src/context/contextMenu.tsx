import React, {ReactElement, useEffect, useState} from "react";
import {ContextMenu} from "./innerClass";
import {render} from "@testing-library/react";



export const useContextMenu = function (target: React.RefObject<HTMLElement> | null, body: ReactElement) {

    useEffect(() => {

        let menu: ContextMenu | undefined

        if (target?.current) {
            menu = new ContextMenu({target: target.current, body: body})
        }


        return () => {
            menu?.ContextMenuWillUnmount()
        }
    }, [body, target])


}
