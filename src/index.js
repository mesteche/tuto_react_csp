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
      increment: () =>
        put(appIn, {
          Counter1: { increment: 1 },
          ...(sync ? { Counter2: { increment: 1 } } : {}),
        }),
      decrement: () =>
        put(appIn, {
          Counter1: { decrement: 1 },
          ...(sync ? { Counter2: { decrement: 1 } } : {}),
        }),
      reset: () =>
        put(appIn, {
          Counter1: { reset: null },
          ...(sync ? { Counter2: { reset: null } } : {}),
        }),
    }),
  Counter2: ({ label, ...props }) =>
    Counter({
      createElement,
      label,
      value: Counter2,
      increment: () =>
        put(appIn, {
          Counter2: { increment: 1 },
          ...(sync ? { Counter1: { increment: 1 } } : {}),
        }),
      decrement: () =>
        put(appIn, {
          Counter2: { decrement: 1 },
          ...(sync ? { Counter1: { decrement: 1 } } : {}),
        }),
      reset: () =>
        put(appIn, {
          Counter2: { reset: null },
          ...(sync ? { Counter1: { reset: null } } : {}),
        }),
    }),
  toggleSync: () => put(appIn, { sync: null }),
})

const appIn = channel()
pipe(
  reduce(stateReducer),
  map(mapStateToProps),
  map(App),
  map(asyncRender(root)),
  filter(() => false),
)(appIn)
put(appIn)
