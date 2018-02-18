/** @jsx createElement */
import { createElement } from 'react'
import { render } from 'react-dom'
import { map, channel, put } from './toolbox/csp'

const root = document.getElementById('root')

const asyncRender = DOMNode => vDOM =>
  new Promise(resolve => render(vDOM, DOMNode, () => resolve(vDOM)))

const renderer = DOMNode => map(asyncRender(DOMNode))

const App = ({ createElement, message }) => <div>{message}</div>

const appIn = channel()
const appOut = renderer(root)(map(App)(appIn))
put(appIn, { createElement, message: 'Hello world!' })
