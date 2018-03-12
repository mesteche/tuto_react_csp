/** @jsx createElement */
import { createElement as RCE } from 'react'
import { render } from 'react-dom'
import { pipe } from './toolbox/fp'
import { map, filter } from './toolbox/csp'
import App from './App'

const root = document.getElementById('root')

const asyncRender = DOMNode => vDOM =>
  new Promise(resolve => render(vDOM, DOMNode, () => resolve(vDOM)))

// prettier-ignore
const createElement = (component, props, ...children) =>
  typeof component === 'string' ?
    RCE(component, props, ...children) :
  process.env.NODE_ENV === 'development' ?
    RCE(component, { createElement, ...props }, ...children) :
  component({ createElement, ...props, children })

pipe(
  App,
  map(C => C({ createElement })),
  map(asyncRender(root)),
  filter(() => false),
)()
