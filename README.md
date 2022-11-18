## Installation

From a Solid JS project directory:

```
npm i solid-edit-objects
```

In a component file (must use module syntax):

```
import { EditableObject, EditableArray } from 'solid-edit-objects'
```

## Usage

in plain JS:

```
import { createEffect, createSignal } from 'solid-js'
import { EditableObject, EditableArray } from 'solid-edit-objects'

const MyComponent = () => {
    //Declaring object and array to be edited
    let obj = {
        foo: ['foo', 'bar' ],
        bar: { foo: 'bar'}
        hello: 'foo',
        num: 23
    }
    let arr = ['foo', 23, {foo: 'bar'}, ['foo','bar']]

    //Declaring signal getter/setter function pairs to make reactive versions of the above values
    let [ object, setObject ] = createSignal(obj)
    let [ array, setArray ] = createSignal(arr)
    
    //Declare boolean signal for open/close functionality
    let [ openObj, setOpenObject ] = createSignal(false)
    let [ openArr, setOpenArray ] = createSignal(false)

    //create effect that will update the value stored in parent whenever its reactive clone is updated (because its value is read inside the effect). It is best to create separate effects for separate values so that only the relevant effects run when values change.

    createEffect(()=>{
        obj = object()
    })
    createEffect(()=>{
        arr = array()
    })

    //JSX for rendering
    return(
        <>
            <Show when={openObject()} fallback={(
                <button
                    onclick={(e)=>{
                        e.preventDefault()
                        setOpenObject(true)
                    }}
                ></button>
            )}>
                <EditableObject
                    model={object()}
                    open={setOpenObject}
                    setter={setObject}
                />
            </Show>
            <Show when={openArray()} fallback={(
                <button
                    onclick={(e)=>{
                        e.preventDefault()
                        setOpenArray(true)
                    }}
                ></button>
            )}>
                <EditableObject
                    model={array()}
                    open={setOpenArray}
                    setter={setArray}
                />
            </Show>
        </>
    )
}
```
If the modified value is needed in a parent component when it updates, you can pass it a setter function from the parent similarly to how the setter function is used in the example above to update the original value in EditableObject's parent, MyComponent.

