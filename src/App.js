import { put, map, reduce } from './toolbox/csp'
import { pipe } from './toolbox/fp'
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

const mapStateToProps = inChan => ({ Counter1, Counter2, sync }) => ({
  Counter1: props =>
    Counter({
      ...props,
      value: Counter1,
      increment: () =>
        put(inChan, {
          Counter1: { increment: 1 },
          ...(sync ? { Counter2: { increment: 1 } } : {}),
        }),
      decrement: () =>
        put(inChan, {
          Counter1: { decrement: 1 },
          ...(sync ? { Counter2: { decrement: 1 } } : {}),
        }),
      reset: () =>
        put(inChan, {
          Counter1: { reset: null },
          ...(sync ? { Counter2: { reset: null } } : {}),
        }),
    }),
  Counter2: props =>
    Counter({
      ...props,
      value: Counter2,
      increment: () =>
        put(inChan, {
          Counter2: { increment: 1 },
          ...(sync ? { Counter1: { increment: 1 } } : {}),
        }),
      decrement: () =>
        put(inChan, {
          Counter2: { decrement: 1 },
          ...(sync ? { Counter1: { decrement: 1 } } : {}),
        }),
      reset: () =>
        put(inChan, {
          Counter2: { reset: null },
          ...(sync ? { Counter1: { reset: null } } : {}),
        }),
    }),
  toggleSync: () => put(inChan, { sync: null }),
})

export const app = inChan =>
  pipe(
    reduce(stateReducer),
    map(mapStateToProps(inChan)),
    map(state => props => App({ ...state, ...props })),
  )(inChan)

export default app
