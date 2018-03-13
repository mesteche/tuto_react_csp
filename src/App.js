import createModule from './createModule'
import App from './Components/App'

import Counter, { handlers } from './Counter'

const syncDispatch = dispatchers => action =>
  Object.entries(dispatchers).forEach(([, d]) => d(action))

// prettier-ignore
const reducer = (
  state = {
    Counter1: () => null,
    Counter2: () => null,
    sync: false,
  },
  actions = {},
) => Object.entries(actions).reduce(
  (state, [key, payload]) =>
    key.startsWith('Counter') ? { ...state, [key]: payload }      :
    key === 'sync'            ? { ...state, [key]: !state[key] }  :
    state,
  state,
)

const mapStoreToProps = (dispatch, dispatchers) => ({
  Counter1,
  Counter2,
  sync,
}) => ({
  ...(sync
    ? {
        Counter1: props =>
          Counter1({
            ...handlers(syncDispatch(dispatchers)),
            ...props,
          }),
        Counter2: props =>
          Counter2({
            ...handlers(syncDispatch(dispatchers)),
            ...props,
          }),
      }
    : { Counter1, Counter2 }),
  toggleSync: () => dispatch({ sync: null }),
})

const dependencies = {
  Counter1: Counter,
  Counter2: Counter,
}

export default createModule(App)({
  reducer,
  mapStoreToProps,
  dependencies,
})
