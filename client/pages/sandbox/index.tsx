import { MyButton } from "@/components/MyButton"

export default function Sandbox() {
    return (
        <div>
            <h1>Sandbox</h1>
            <MyButton label={"Cool"} isDisabled={false} whenMyButtonIsClicked={() => {
                console.log("BUTTON CLICKED!!!!");
            }} />
        </div>
    )
}