import { For } from 'solid-js';

interface DropdownProps {
    options: string[],
    default?: string,
    label: string,
    setter: Function
}

const Dropdown = (props: DropdownProps) => {
    return (
        <>
            <label for="dropdown">{props.label}</label>
            <select id="dropdown" value={props.default? props.default : 'choose value'} onchange={(e) => props.setter(e.currentTarget.value)} >
                <For each={props.options}>
                    {(option) => {
                        if(props.default && option==props.default){
                            return(<option value={option} selected>{option}</option>)
                        }
                        return(<option value={option}>{option}</option>)
                    }}
                </For>
            </select>
        </>
    )
}

export { Dropdown }