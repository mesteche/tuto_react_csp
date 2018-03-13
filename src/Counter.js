import createModule from './createModule'
import Counter from './Components/Counter'

export const handlers = dispatch => ({
  increment: () => dispatch({ increment: 1 }),
  decrement: () => dispatch({ decrement: 1 }),
  reset: () => dispatch({ reset: null }),
})

// prettier-ignore
const reducer = (state = 0, actions = {}) =>
Object.entries(actions).reduce(
  (state, [key, payload]) =>
    key === 'increment'  ? state + (payload || 0) :
    key === 'decrement'  ? state - (payload || 0) :
    key === 'reset'      ? 0                      :
    state,
  state
)

const mapStoreToProps = dispatch => state => ({
  value: state,
  ...handlers(dispatch),
})

export default createModule(Counter)({ reducer, mapStoreToProps })
