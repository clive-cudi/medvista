import { FocusEventHandler } from "react";

export const InputTime = () => {

    const onFocusHandler: FocusEventHandler<HTMLInputElement> = (event) => {
        console.log("hello there you entered :  my name is ", event.target.name);
    }
 
    const onBlurHandler: FocusEventHandler<HTMLInputElement> | undefined = (event) => {
        console.log("you left ");
    }
 
    const onTimeChangeHandler = (val: string) => {
        if (val.length === 5) {
            // do something with this value
        }
    }
 
    return (
        <></>
    );
 
 }