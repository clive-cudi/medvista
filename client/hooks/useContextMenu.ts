import React, { useContext } from "react";
import { ContextMenuCtx, ContextMenuCtx_Props } from "@/context";

export function useContextMenu() {
    const [ctxMenu, setCtxMenu] = useContext(ContextMenuCtx) as ContextMenuCtx_Props;

    function openAtCoords(top: number, left: number, elements: JSX.Element[]) {
        // open the context menu at the given coordinates
        console.log(`Opening at coords: \ttop: ${top}\n\tleft: ${left}`);
        setCtxMenu((prevState) => ({
            ...prevState,
            open: true,
            coords: {
                top,
                left
            },
            elements: elements
        }));
    }

    function openAtCursor(e: React.MouseEvent<HTMLElement>, elements: JSX.Element[]) {
        // find the position of the cursor
        let x = e.pageX;
        let y = e.pageY;

        openAtCoords(y, x, elements);
    }

    function closeContextMenu() {
        setCtxMenu((prevState) => ({
            ...prevState,
            open: false
        }));
    }

    return {
        ctxMenu,
        openAtCoords,
        openAtCursor,
        closeContextMenu
    }
}