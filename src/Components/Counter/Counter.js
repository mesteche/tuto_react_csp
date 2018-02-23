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
  <button
    className={`counter`}
    onClick={reset}
    onWheel={wheel(increment, decrement)}>
    <style>{style({ value })}</style>
    {label}: {value}
  </button>
)

const style = ({ value }) => `
.counter {
  background: radial-gradient(
    ellipse at center,
    #ff0080 0%,
    #ff8c00 ${Math.abs(value) % 100 - 50}%,
    #40e0d0 ${Math.abs(value) % 100}%
  );
}`

export default Counter
