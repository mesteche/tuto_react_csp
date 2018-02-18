/** @jsx createElement */
import { createElement } from 'react'
import { render } from 'react-dom'
import { map, filter, channel, put } from './toolbox/csp'
import { pipe } from './toolbox/fp'

const root = document.getElementById('root')

const asyncRender = DOMNode => vDOM =>
  new Promise(resolve => render(vDOM, DOMNode, () => resolve(vDOM)))

const App = ({ createElement, message }) => <div>{message}</div>

const appIn = channel()
// prettier-ignore
pipe(
  map(App),
  map(asyncRender(root)),
  filter(() => false),
)(appIn)

put(appIn, { createElement, message: 'Hello world!' })
put(appIn, { createElement, message: 'Hello new world!' })
