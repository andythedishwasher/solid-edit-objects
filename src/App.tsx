import { Component, Show, createSignal, createEffect } from 'solid-js';
import { EditableObject } from './components/EditableObject';
import { EditableArray } from './components/EditableArray';
import styles from './App.module.css';

const App: Component = () => {
  let example = {
    string: "hello world",
    number: 23,
    boolean: true,
    array: [
      {
        nestedIterables: true
      },
      'foo',
      'bar'
    ],
    object: {
      nestedArray: [
        'foo',
        'bar'
      ],
      nestedObject: {
        foo: 'bar'
      },
      foo: 'bar'
    }
  }

  let [ arrayModel, setArrayModel ] = createSignal(example.array)
  let [ open, setOpen ] = createSignal(false)
  createEffect(()=> console.log(arrayModel()))
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <p>Page Variables: </p>
        <Show when={open()} fallback={(
          <>
            <button onclick={(e)=>{
              e.preventDefault()
              setOpen(true)
            }}>Edit Array</button>
          </>
        )}>
          <EditableArray
            class="var-menu"
            model={arrayModel()}
            open={setOpen}
            setter={setArrayModel}
          />  
        </Show>
      </header>
    </div>
  );
};

export default App;
