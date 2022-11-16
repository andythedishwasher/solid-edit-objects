import { createSignal, createEffect, Show } from 'solid-js'
import { EditableObject } from './EditableObject'
import { EditableArray } from './EditableArray'
import { Dropdown } from './Dropdown'

interface NewEntryMenuProps {
    key?: string,
    value?: any,
    type?: string,
    open: Function,
    setter: Function
}

const NewEntryMenu = (props: NewEntryMenuProps) => {
    let [ newEntry, setNewEntry] = createSignal([
        props.key? props.key:'key',
        props.value? props.value:'' as any
    ])
    let [ newKey, setNewKey ] = createSignal(props.key? props.key : 'key')
    let [ newValue, setNewValue ] = createSignal(props.value? props.value: {} as any)
    let [ newValueType, setNewValueType ] = createSignal(props.type? props.type:'string')
    let [ iterableExpanded, setIterableExpanded ] = createSignal(false)
    createEffect(()=>{
        switch(typeof newValue()){
            case 'object': {
                if(Array.isArray(newValue())){
                    setNewValueType('Array')
                } else setNewValueType('Object')
                break
            }
            default: {setNewValueType(typeof newValue())}
        }     
    })
    
    return(
    <>
        <input 
            type="text" 
            value={newKey()}
            onchange={(e)=>{
                setNewKey(e.currentTarget.value)
            }}
        /><br/>
        <Dropdown 
            options={['string', 'number','boolean','Object','Array']}
            default={newValueType()}
            label="choose value type"
            setter={setNewValueType}
        /><br/>
        <Show when={newValueType()=='Object'}>
            <Show when={iterableExpanded()} fallback={(
                <>
                    <button
                        onclick={(e)=>{
                            e.preventDefault()
                            setIterableExpanded(true)
                        }}
                    >Edit Object</button><br/>
                </>
            )}>
                <>
                    <EditableObject
                        class="var-menu" 
                        model={newValue()?newValue():{key: 'value'}}
                        open={setIterableExpanded}
                        setter={setNewValue}
                    /><br/>
                </>
            </Show>
        </Show>
        <Show when={newValueType()=='Array'}>
            <Show when={iterableExpanded()} fallback={(
                <>
                    <button
                        onclick={(e)=>{
                            e.preventDefault()
                            setIterableExpanded(true)
                        }}
                    >Edit Array</button><br/>
                </>
            )}>
                <>
                    <EditableArray 
                        class="var-menu"
                        model={newValue()? newValue():['string']}
                        open={setIterableExpanded}
                        setter={setNewValue}
                    /><br/>
                </>
            </Show>
        </Show>
        <Show when={newValueType()=='string'}>
            <>
                <input 
                    type="text" 
                    value={newValue()}
                    onchange={(e)=>setNewValue(e.currentTarget.value)}
                    onkeyup={(e)=>{
                        if(e.key=="Enter"){
                            setNewEntry([newKey(), newValue()])
                            props.setter(newEntry())
                            props.open(false)
                        }
                    }}
                /><br/>
            </>
        </Show>
        <Show when={newValueType()=='number'}>
            <>
                <input 
                    type="number" 
                    value={newValue()}
                    onchange={(e)=>setNewValue(e.currentTarget.value)}
                    onkeyup={(e)=>{
                        if(e.key=="Enter"){
                            setNewEntry([newKey(), newValue()])
                            props.setter(newEntry())
                            props.open(false)
                        }
                    }}
                /><br/>
            </>
        </Show>
        <Show when={newValueType()=='boolean'}>
            <>
                <Dropdown 
                    options={['true','false']}
                    default={newValue()}
                    label=""
                    setter={setNewValue}
                /><br/>
            </>
        </Show>
        <button
            onclick={(e)=>{
                e.preventDefault()
                setNewEntry([newKey(), newValue()])
                props.setter(newEntry())
                props.open(false)
            }}
        >Save Entry</button><br/>
    </>
    )
}
export { NewEntryMenu }