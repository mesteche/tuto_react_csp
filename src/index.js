import { createElement } from 'react'
import { render } from 'react-dom'
import Title from './Title'

render(
  createElement(Title, { createElement, title: 'Hello world!' }),
  document.getElementById('root'),
)
