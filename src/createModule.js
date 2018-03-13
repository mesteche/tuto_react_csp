import { channel, reduce, map, any, put } from './toolbox/csp'
import { pipe } from './toolbox/fp'

const modulesMapper = modules =>
  Object.entries(modules).reduce(
    (descriptors, [name, module, inChan = channel()]) => [
      ...descriptors,
      {
        name,
        module: pipe(module, map(c => ({ [name]: c })))(inChan),
        dispatch: action => put(inChan, action),
      },
    ],
    [],
  )

const createModule = Component => ({
  reducer = () => ({}),
  mapStoreToProps = () => x => x,
  dependencies = {},
  autorun = true,
}) => (inChan = channel()) => {
  const modules = modulesMapper(dependencies)

  return (
    (!autorun || put(inChan)) &&
    pipe(
      any(modules.map(m => m.module)),
      reduce(reducer),
      map(
        mapStoreToProps(
          action => put(inChan, action),
          modules.reduce(
            (m, { name, dispatch }) => ({
              ...m,
              [name]: dispatch,
            }),
            {},
          ),
        ),
      ),
      map(state => props => Component({ ...state, ...props })),
    )(inChan)
  )
}

export default createModule
