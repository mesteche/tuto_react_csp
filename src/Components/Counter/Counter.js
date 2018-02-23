/** @jsx createElement */

const wheel = (increment, decrement) => ({ deltaY }) => {
  deltaY < 0 ? increment() : deltaY > 0 && decrement()
}

const idGen = () =>
  Math.random()
    .toString(36)
    .slice(2, 9)

const Counter = ({
  createElement,
  label,
  value,
  increment,
  decrement,
  reset,
  id = idGen(),
}) => (
  <button
    className={`counter counter-${id}`}
    onClick={reset}
    onWheel={wheel(increment, decrement)}>
    <style>{style({ value, id })}</style>
    {label}: {value}
  </button>
)

const style = ({ value, id }) => `
  .counter-${id} {
    background: radial-gradient(
      ellipse at center,
      #ff0080 0%,
      #ff8c00 ${Math.abs(value) % 100 - 50}%,
      #40e0d0 ${Math.abs(value) % 100}%
    );
  }
`

export default Counter
