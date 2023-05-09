// import { FunctionComponent } from "react";

declare module "react-time-input" {
  interface TimeInput_props {
    name: string;
    initTime: string;
    className: string;
    mountFocus: string;
    onTimeChange?: (val: string) => void;
    onFocusHandler?: FocusEventHandler<HTMLInputElement> | undefined;
    onBlurHandler?: FocusEventHandler<HTMLInputElement> | undefined;
  }
  const TimeInput: ({}: TimeInput_props) => JSX.Element;
  export default TimeInput;
}
