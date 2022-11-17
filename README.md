## Solid Editable Objects and Arrays

A pair of Solid components that allow front end users to directly edit JS objects or arrays recursively and reactively

## Installation

NOTE: package will be published soon! Until then, please feel free to clone this repo and npm link to it.

From the directory of a Solid JS project:

```
npm install solid-edit-objects
```
Then import into whatever component you want to use them in. Must use module syntax.

```
import { EditableObject, EditableArray } from 'solid-edit-objects'
```

## Usage

Both components accept a very simple set of properties:

model: an object signal getter (for EditableObject) or array signal getter (for EditableArray) that you want the user to be able to modify.

open: a boolean signal setter used to open and close the object when certain events occur.

setter: the setter for the model signal.

You may use a class attribute to define styles for the component. I discovered that this actually has to be specified in order to be valid syntax for a custom Solid component because of how the props work, but I included class as an optional prop that is processed as a class attribute for a wrapper div, so you shouldn't have to worry about it.

## Example

```
import { EditableObject, EditableArray } from 'solid-edit-objects'
import { createSignal } from 'solid-js'

function MyComponent () {
  //object and array to be modified
  let object = {
    foo: 'bar',
    num: 23,
    arr: ['foo','bar'],
    obj: {
      foo: 'bar'
    }
  };
  let array = [ 'str', 23, ['foo','bar'], {foo: 'bar'} ]
  //getter and setter functions for reactive values and collapse toggles
  let [obj, setObj] = createSignal(object)
  let [arr, setArr] = createSignal(array)
  let [openObj, setOpenObj] = createSignal(false)
  let [openArr, setOpenArr] = createSignal(false)
  
  return (
    <>
      <Show when={openObj()} fallback={(
        <button
          onclick={(e)=>{
            e.preventDefault()
            setOpenObj(true)
          }}
        >Edit Object</button>
      )}>
        <EditableObject 
          model={objModel()}
          open={objOpen()}
          setter={setObjModel()}
        />
      </Show>
      <Show when={openArr()} fallback={(
        <button
          onclick={(e)=>{
            e.preventDefault()
            setOpenArr(true)
          }}
        >Edit Array</button>
      )}>
        <EditableArray 
          model={arrModel()}
          open={arrOpen()}
          setter={setArrModel()}
        />
      </Show>
    </>
  )
}

render(() => <MyComponent />, document.getElementById('root') as HTMLElement);
```

For questions, email atd@thecodekitchen.xyz
