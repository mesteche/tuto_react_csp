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

// prettier-ignore
const counterReducer = (state = 0, actions = {}) =>
  Object.entries(actions).reduce(
    (state, [key, payload]) =>
      key === 'increment'  ? state + (payload || 0) :
      key === 'decrement'  ? state - (payload || 0) :
      key === 'reset'      ? 0                      :
      state,
    state
  )
// prettier-ignore
const stateReducer = (
  state = {
    Counter1: counterReducer(),
    Counter2: counterReducer(),
    sync: false,
  },
  actions = {}
) => Object.entries(actions).reduce(
  (state, [key, payload]) =>
    key === 'Counter1'
      ? { ...state, [key]: counterReducer(state[key], payload) } :
    key === 'Counter2'
      ? { ...state, [key]: counterReducer(state[key], payload) } :
    key === 'sync'
      ? { ...state, [key]: !state[key] }                         :
    state,
  state,
)

const mapStateToProps = ({ Counter1, Counter2, sync }) => ({
  createElement,
  Counter1: ({ label, ...props }) =>
    Counter({
      createElement,
      label,
      value: Counter1,
      increment: () => {},
      decrement: () => {},
      reset: () => {},
    }),
  Counter2: ({ label, ...props }) =>
    Counter({
      createElement,
      label,
      value: Counter2,
      increment: () => {},
      decrement: () => {},
      reset: () => {},
    }),
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
put(appIn)
