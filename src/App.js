import createModule from './createModule'
import App from './Components/App'

import Counter from './Components/Counter'

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
const reducer = (
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

const mapStoreToProps = dispatch => ({ Counter1, Counter2, sync }) => ({
  Counter1: props =>
    Counter({
      ...props,
      value: Counter1,
      increment: () =>
        dispatch({
          Counter1: { increment: 1 },
          ...(sync ? { Counter2: { increment: 1 } } : {}),
        }),
      decrement: () =>
        dispatch({
          Counter1: { decrement: 1 },
          ...(sync ? { Counter2: { decrement: 1 } } : {}),
        }),
      reset: () =>
        dispatch({
          Counter1: { reset: null },
          ...(sync ? { Counter2: { reset: null } } : {}),
        }),
    }),
  Counter2: props =>
    Counter({
      ...props,
      value: Counter2,
      increment: () =>
        dispatch({
          Counter2: { increment: 1 },
          ...(sync ? { Counter1: { increment: 1 } } : {}),
        }),
      decrement: () =>
        dispatch({
          Counter2: { decrement: 1 },
          ...(sync ? { Counter1: { decrement: 1 } } : {}),
        }),
      reset: () =>
        dispatch({
          Counter2: { reset: null },
          ...(sync ? { Counter1: { reset: null } } : {}),
        }),
    }),
  toggleSync: () => dispatch({ sync: null }),
})

export default createModule(App)({ reducer, mapStoreToProps })
