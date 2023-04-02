import React, { useState, useEffect } from "react";
import styles from "@/styles/components/reusable/general/ctxMenu.module.scss";
import { useContextMenu } from "../../../hooks";

export interface ContextMenu_Props {
    elmList: JSX.Element[]
}

export const ContextMenu = ({ elmList }: ContextMenu_Props) => {
    const { ctxMenu } = useContextMenu();
    const [coords, setCoords] = useState({
        top: ctxMenu.coords.top,
        left: ctxMenu.coords.left
    })

    function generateCoords(top: number, left: number) {
        const contextElmWidth = document.getElementById("context-menu")?.clientWidth ?? 0;
        const contextElmHeight = document.getElementById("context-menu")?.clientHeight ?? 0;

        console.log({
            left,
            rem: window.innerWidth - (contextElmWidth)
        })

        console.log({
            contextElmHeight,
            contextElmWidth
        })

        if (left > window.innerWidth - (contextElmWidth) && top > window.innerHeight - (contextElmHeight)) {
            return {
                top: top - contextElmHeight,
                left: left - contextElmWidth
            }
        }
        
        if (left > window.innerWidth - (contextElmWidth)) {
            return {
                top,
                left: left - contextElmWidth
            }
        };

        if (top > window.innerHeight - (contextElmHeight)) {
            return {
                top: top - contextElmHeight,
                left
            }
        }

        console.log("returning defaults");
        console.log(left)

        return {
            top,
            left
        }
    }

    useEffect(() => {
        setCoords({
            top: generateCoords(ctxMenu.coords.top, ctxMenu.coords.left).top,
            left: generateCoords(ctxMenu.coords.top, ctxMenu.coords.left).left
        })
    }, [ctxMenu.coords.left, ctxMenu.coords.top])

    return (
        <div className={styles.ctx_menu} style={{top: coords.top, left: coords.left}} id={"context-menu"} onClick={(e) => {e.stopPropagation()}}>
            <ul>
                {elmList.map((elm, index) => <li key={index}>{elm}</li>)}
            </ul>
        </div>
    )
}