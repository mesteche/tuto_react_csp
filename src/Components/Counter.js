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
    className={`button`}
    onClick={reset}
    onWheel={wheel(increment, decrement)}>
    <style>{style({ value })}</style>
    {label}: {value}
  </button>
)

const style = ({ value }) => `
.button::-moz-focus-inner {
  border: 0;
}
.button {
  padding: 10px;
  width: 150px;
  height: 150px;
  color: #000;
  text-shadow:  0px  1px 2px #fff,
                1px  0px 2px #fff,
                -1px  0px 2px #fff,
                0px -1px 2px #fff;
  font-weight: bold;
  background-color: #EEE;
  background: radial-gradient(
    ellipse at center,
    #ff0080 0%,
    #ff8c00 ${Math.abs(value) % 100 - 50}%,
    #40e0d0 ${Math.abs(value) % 100}%
  );
  border-radius: 50%;
}`

export default Counter
