/** @jsx createElement */
import { createElement } from 'react'
import { render } from 'react-dom'
import { pipe } from './toolbox/fp'
import { map, reduce, filter, channel, put } from './toolbox/csp'
import App from './Components/App'
import Counter from './Components/Counter'

const root = document.getElementById('root')

const asyncRender = DOMNode => vDOM =>
  new Promise(resolve => render(vDOM, DOMNode, () => resolve(vDOM)))

const stateReducer = (state, actions) => state

const mapStateToProps = ({ Counter1, Counter2, sync }) => ({
  createElement,
  Counter1: () => null,
  Counter2: () => null,
  toggleSync: () => {},
})

const appIn = channel()
pipe(
  reduce(stateReducer, {
    Counter1: 0,
    Counter2: 0,
    sync: false,
  }),
  map(mapStateToProps),
  map(App),
  map(asyncRender(root)),
  filter(() => false),
)(appIn)
/**
 * On envoie quelque chose sur notre channel
 * histoire qu'il lance un premier rendu
 **/
put(appIn, null)
