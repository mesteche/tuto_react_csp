/** @jsx createElement */
const wheel = (increment, decrement) => ({ deltaY }) => {
  deltaY < 0 ? increment() : deltaY > 0 && decrement()
}
const Counter = ({
  createElement,
  label,
  value,
  increment,
  decrement,
  reset,
}) => (
  <button onClick={reset} onWheel={wheel(increment, decrement)}>
    {label}: {value}
  </button>
)
export default Counter
