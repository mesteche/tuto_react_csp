/** @jsx createElement */
import { createElement } from 'react'
import { render } from 'react-dom'
import Title from './Title'
import Counter from './Counter'

render(
  <div>
    <Title createElement={createElement} title="Hello world!" />
    <Counter createElement={createElement} />
  </div>,
  document.getElementById('root'),
)
