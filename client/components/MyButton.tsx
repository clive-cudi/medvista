function MyButton({ label, isDisabled, whenMyButtonIsClicked }: {label: string, isDisabled: boolean, whenMyButtonIsClicked: () => void}) {
    return (
        <span>
            <button disabled={isDisabled} onClick={() => {
                whenMyButtonIsClicked();
            }}>{label}</button>
        </span>
    )
}

function sayHello(message: string): string {

    return message;
}

export {MyButton};