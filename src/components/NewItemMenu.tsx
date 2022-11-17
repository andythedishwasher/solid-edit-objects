import { createSignal, createEffect, Show } from 'solid-js'
import { EditableArray } from './EditableArray'
import { EditableObject } from './EditableObject'
import { Dropdown } from './Dropdown'

interface NewItemMenuProps {
    value?: any,
    type?: string,
    open: Function,
    setter: Function
}

const NewItemMenu = (props: NewItemMenuProps) => {
    let [ type, setType ] = createSignal(props.type? props.type : 'string')
    let [ value, setValue ] = createSignal(props.value? props.value: "" as any)
    let [ iterableExpanded, setIterableExpanded ] = createSignal(false)

    createEffect(()=>{
        switch(typeof value()){
            case 'object': {
                if(Array.isArray(value())){
                    setType('Array')
                } else setType('Object')
                break
            }
            default: {setType(typeof value())}
        }     
    })
    return (
        <>
            <Dropdown 
                options={['string','number','boolean','Object','Array']}
                default={type()}
                label="value type:"
                setter={setType}
            /><br/>
            <Show when={type()=='string'}>
                <input 
                    type="text" 
                    value={value()} 
                    onchange={(e)=>setValue(e.currentTarget.value)} 
                    onkeyup={(e)=>{
                        if(e.key=='Enter'){
                            props.setter(value())
                            props.open(false)
                        }
                    }}
                /><br/>
                <button 
                    onclick={(e)=>{
                        e.preventDefault()
                        props.setter(value())
                        props.open(false)
                    }}
                >Save Item</button><br/> 
            </Show>
            <Show when={type()=='number'}>
                <input 
                    type="number"
                    value={value()}
                    onchange={(e)=>setValue(parseFloat(e.currentTarget.value))}
                    onkeyup={(e)=>{
                        if(e.key=='Enter'){
                            props.setter(value())
                            props.open(false)
                        }
                    }}
                /><br/>
                <button 
                    onclick={(e)=>{
                        e.preventDefault()
                        props.setter(value())
                        props.open(false)
                    }}
                >Save Item</button><br/>
            </Show>
            <Show when={type()=='boolean'}>
                <Dropdown 
                    options={['false','true']}
                    label="initial value"
                    setter={setValue}
                /><br/>
                <button 
                    onclick={(e)=>{
                        e.preventDefault()
                        if(value()=="false"){
                            props.setter(false)
                        } else {
                            props.setter(true)
                        }
                        props.open(false)
                    }}
                >Save Item</button><br/>
            </Show>
            <Show when={type()=='Object'}>
                <Show when={iterableExpanded()} fallback={(
                    <>
                        <button
                            onclick={(e)=>{
                                e.preventDefault()
                                setIterableExpanded(true)
                            }}
                        >Object</button><br/>
                    </>
                )}>
                    <EditableObject 
                        class="var-menu"
                        model={value()}
                        open={setIterableExpanded}
                        setter={setValue}
                    /><br/>
                </Show> 
                <button 
                    onclick={(e)=>{
                        e.preventDefault()
                        props.setter(value())
                        props.open(false)
                    }}
                >Save Item</button><br/>
            </Show>
            <Show when={type()=='Array'}>
                <Show when={iterableExpanded()} fallback={(
                    <>
                        <button
                            onclick={(e)=>{
                                e.preventDefault()
                                setIterableExpanded(true)
                            }}
                        >Array</button><br/>
                    </>
                )}>
                    <EditableArray
                        class="var-menu" 
                        model={value()}
                        open={setIterableExpanded}
                        setter={setValue}
                    /><br/>
                </Show>
                <button 
                    onclick={(e)=>{
                        e.preventDefault()
                        if(value()){
                            props.setter(value())
                        }
                        props.open(false)
                    }}
                >Save Item</button><br/>
            </Show>
        </>
    )
}
export { NewItemMenu }