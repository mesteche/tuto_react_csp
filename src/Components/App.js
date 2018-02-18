/** @jsx createElement */
import Title from './Title'

const App = ({ createElement, Counter1, Counter2, toggleSync }) => (
  <div>
    <Title createElement={createElement} title="Hello world!" />
    <div>
      <Counter1 label="Counter A" />
      <Counter1 label="Counter B" />
      <Counter2 label="Counter C" />
    </div>
    <div>
      Sync: <input type="checkbox" onChange={toggleSync} />
    </div>
  </div>
)
export default App
