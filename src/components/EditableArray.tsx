import { createEffect, createSignal, For, Show } from 'solid-js'
import { NewItemMenu } from './NewItemMenu'

interface EditableArrayProps {
    class?: string,
    model?: any[],
    open: Function,
    setter: Function
}

const EditableArray = (props: EditableArrayProps) => {
    let [ newModel, setNewModel ] = createSignal(props.model? props.model : ['new value'])
    let [ newItem, setNewItem ] = createSignal([] as any)
    let [ newItemMenu, setNewItemMenu ] = createSignal(false)

    createEffect(()=>{
        if(newItem().length > 0 || Array.isArray(newItem())==false){
            setNewModel(newModel=>[...newModel, newItem()])
            console.log(newModel())
        }})
    return (
        <div class={props.class?props.class:"arr-edit"}>
            <For each={newModel()}>
                {(item, index)=>{
                    let [ currentItem, setCurrentItem ] = createSignal(item)
                    let [ editItemMenu, setEditItemMenu ] = createSignal(false)
                    let type = () => {
                        if(typeof currentItem()=='object'){
                            if(Array.isArray(currentItem())){
                                return 'Array'
                            }
                            return 'Object'
                        }
                        return typeof currentItem()
                    }
                    createEffect(()=>{
                        setNewModel(newModel=>{
                            newModel.splice(index(),1,currentItem())
                            return newModel
                        })
                    })
                    return (
                        <>
                            <Show when={editItemMenu()} fallback={(
                                <>
                                    <Show 
                                        when={typeof currentItem() == 'object'}
                                        fallback={(<><p>{currentItem() as string}</p><br/></>)}
                                    >
                                        <Show 
                                            when={Array.isArray(currentItem())}
                                            fallback={(<><p>Object</p><br/></>)}
                                        >
                                            <p>Array</p><br/>
                                        </Show>
                                    </Show>
                                    <button
                                        onclick={(e)=>{
                                            e.preventDefault()
                                            setEditItemMenu(true)
                                        }}
                                    >Edit {type()}</button><br/>
                                    <button
                                        onclick={(e)=>{
                                            e.preventDefault()
                                            setNewModel(newModel=>{
                                                newModel.splice(index(),1)
                                                return newModel
                                            })
                                            props.setter(newModel())
                                            props.open(false)
                                        }}
                                    >Delete {type()}</button><br/>
                                </>
                            )}>
                                <NewItemMenu 
                                    value={currentItem()}
                                    type={
                                        typeof currentItem() == 'object'?
                                            Array.isArray(currentItem())? 
                                                'Array' : 
                                            'Object' :
                                        typeof currentItem()
                                    }
                                    open={setEditItemMenu}
                                    setter={setCurrentItem}
                                /><br/>
                            </Show>    
                        </>
                    )
                }}   
            </For>
            <Show when={newItemMenu()} fallback={(
                <>
                    <button
                        onclick={(e)=>{
                            e.preventDefault()
                            setNewItemMenu(true)
                        }}
                    >New Item</button><br/>
                </>
            )}>
                <NewItemMenu 
                    open={setNewItemMenu}
                    setter={setNewItem}
                /><br/>
            </Show>
            <button
                onclick={(e)=>{
                    e.preventDefault()
                    props.setter(newModel())
                    props.open(false)
                }}
            >Save Array</button><br/>    
        </div>
    )    
}

export { EditableArray }