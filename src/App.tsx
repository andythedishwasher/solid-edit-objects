import { Component, Show, createSignal, createEffect } from 'solid-js';
import { EditableObject } from './components/EditableObject';

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
  let [ model, setModel ] = createSignal(example)
  let [ open, setOpen ] = createSignal(false)
  createEffect(()=> console.log(model()))
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <p>Page Variables: </p>
        <Show when={open()} fallback={(
          <>
            <button onclick={(e)=>{
              e.preventDefault()
              setOpen(true)
            }}>Edit Object</button>
          </>
        )}>
          <EditableObject
            class="var-menu"
            model={model()}
            open={setOpen}
            setter={setModel}
          />  
        </Show>
      </header>
    </div>
  );
};

export default App;
