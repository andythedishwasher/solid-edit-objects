import { createEffect, createSignal, For, Show } from 'solid-js'
import { NewEntryMenu } from './NewEntryMenu'

interface EditableObjectProps {
    class?: string,
    model?: object,
    open: Function,
    setter: Function
}

const EditableObject = (props: EditableObjectProps ) => {
    //Convert to entry array for iteration over key value pairs
    let [ entries, setEntries ] = createSignal(props.model? Object.entries(props.model): [['key', 'value' as any]])
    //Computed property that tracks changes in entries array and converts back to object format
    let newModel = () => {
        console.log(entries())
        return Object.fromEntries(entries())
    }
    //toggle signal for new entry menu
    let [ newEntryMenu, setNewEntryMenu ] = createSignal(false)
    //initialize new entry as empty array and add it to entries when it gets populated
    let [ newEntry, setNewEntry ] = createSignal([])
    createEffect(()=>{
        if(newEntry().length > 0){
            setEntries(entries=>{
                return [...entries, newEntry()]
            })
        }
    })
    
    return(
        <div class={props.class?props.class:"obj-edit"}>
            <For each={entries()}>
                {(entry, index)=>{
                    createEffect(()=> {
                        setEntries(entries=>{
                            entries.splice(index(),1,currentEntry())
                            return entries
                        })
                    })
                    let [ currentEntry, setCurrentEntry ] = createSignal(entry)
                   
                    let [ editEntryMenu, setEditEntryMenu ] = createSignal(false)
                    return(
                        <>
                            <Show when={editEntryMenu()} fallback={(
                                //Define collapsed version of entry based on value type
                                <>
                                    {/*case entry value is an object*/}
                                    <Show when={Object.keys(currentEntry()[1])[0] != "0"}>
                                        <For each={Object.keys(currentEntry()[1])}>
                                            {(key)=>{
                                                return(
                                                    <p>{key}</p>
                                                )
                                            }}
                                        </For>
                                    </Show>
                                    {/*case entry value is an array*/}
                                    <Show when={Array.isArray(currentEntry()[1])}>
                                        <For each={currentEntry()[1]}>
                                            {(item)=>{
                                                if(typeof item == 'object'){
                                                    if(Array.isArray(item)){
                                                        return(<p>Array</p>)
                                                    }
                                                    return(<p>Object</p>)
                                                }
                                                return(<p>{item as string}</p>)
                                            }}
                                        </For>
                                    </Show>
                                    {/*default case*/}
                                    <Show when={typeof currentEntry()[1] != 'object'}>
                                        <p>{currentEntry()[1]}</p>
                                    </Show>
                                    {/*Edit and Delete buttons*/}
                                    <button  
                                        onclick={(e)=>{
                                            e.preventDefault()
                                            setEditEntryMenu(true)
                                        }}
                                    >Edit {currentEntry()[0]}: </button><br/>
                                    <button
                                        onclick={(e)=>{
                                            e.preventDefault()
                                            setEntries(entries=>{
                                                entries.splice(index(),1)
                                                return entries
                                            })
                                            props.setter(newModel)
                                            props.open(false)
                                        }}
                                    >Delete {currentEntry()[0]}</button><br/>
                                </>
                            )}>
                                <NewEntryMenu 
                                    key={currentEntry()[0]}
                                    value={currentEntry()[1]}
                                    type={
                                        typeof currentEntry()[1] == 'object'?
                                            Array.isArray(currentEntry()[1])? 
                                                'Array' : 
                                            'Object' :
                                        typeof currentEntry()[1]
                                    }
                                    open={setEditEntryMenu}
                                    setter={setCurrentEntry}
                                />
                            </Show>
                        </>
                    )
                }}
            </For>
            <Show when={newEntryMenu()} fallback={(
                <>
                    <button
                        onclick={(e)=>{
                            e.preventDefault()
                            setNewEntryMenu(true)
                        }}
                    >Add New Entry</button><br/>
                </>
            )}>
                <NewEntryMenu 
                    open={setNewEntryMenu}
                    setter={setNewEntry}
                />
            </Show>
            <button
                onclick={(e)=>{
                    e.preventDefault()
                    
                    props.setter(newModel())
                    console.log(newModel())
                    props.open(false)
                }}
            >Save Object</button>
        </div>
    )
}

export { EditableObject }