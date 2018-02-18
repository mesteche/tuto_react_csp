/** @jsx createElement */
import { createElement } from 'react'
import { render } from 'react-dom'
import Title from './Title'
import Counter from './Counter'
const state = {
  counterValue: 0,
}
const incrementCounter = () => {
  console.log('click')
  state.counterValue = state.counterValue + 1
  renderApp(state)
}
const renderApp = state => {
  render(
    <div>
      <Title createElement={createElement} title="Hello world!" />
      <Counter
        createElement={createElement}
        value={state.counterValue}
        increment={incrementCounter}
      />
    </div>,
    document.getElementById('root'),
  )
}
renderApp(state)
