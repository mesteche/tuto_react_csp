/** @jsx createElement */
const Counter = ({ createElement, value, increment }) => (
  <button onClick={increment}>Clicked {value} times</button>
)
export default Counter
