/** @jsx createElement */
import { createElement } from 'react'
import { render } from 'react-dom'
import Title from './Title'

render(
  <Title createElement={createElement} title="Hello world!" />,
  document.getElementById('root'),
)
