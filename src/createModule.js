import { channel, reduce, map, any, put } from './toolbox/csp'
import { pipe } from './toolbox/fp'

const initModule = (module, name, inChan) =>
  pipe(module, map(c => ({ [name]: c })))(inChan)

const createDispatcher = inChan => action => put(inChan, action)

const modulesMapper = modules =>
  Object.entries(modules).reduce(
    ({ modules, dispatchers }, [name, module, inChan = channel()]) => ({
      modules: [...modules, initModule(module, name, inChan)],
      dispatchers: { ...dispatchers, [name]: createDispatcher(inChan) },
    }),
    { modules: [] },
  )

const createModule = Component => ({
  reducer = () => ({}),
  mapStoreToProps = () => x => x,
  dependencies = {},
  autorun = true,
}) => (inChan = channel()) => {
  const { modules, dispatchers } = modulesMapper(dependencies)

  return (
    (!autorun || put(inChan)) &&
    pipe(
      any(modules),
      reduce(reducer),
      map(mapStoreToProps(createDispatcher(inChan), dispatchers)),
      map(state => props => Component({ ...state, ...props })),
    )(inChan)
  )
}

export default createModule
