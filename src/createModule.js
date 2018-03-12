import { channel, reduce, map, put } from './toolbox/csp'
import { pipe } from './toolbox/fp'

const createModule = Component => ({
  reducer = () => ({}),
  mapStoreToProps = () => x => x,
  autorun = true,
}) => (inChan = channel()) =>
  (!autorun || put(inChan)) &&
  pipe(
    reduce(reducer),
    map(mapStoreToProps(action => put(inChan, action))),
    map(state => props => Component({ ...state, ...props })),
  )(inChan)

export default createModule
