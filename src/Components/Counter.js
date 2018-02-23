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
    style={style({ value })}
    onClick={reset}
    onWheel={wheel(increment, decrement)}>
    {label}: {value}
  </button>
)

const style = ({ value }) => ({
  padding: 10,
  width: 150,
  height: 150,
  color: '#000',
  textShadow: `  0px  1px 2px #fff,
                 1px  0px 2px #fff,
                -1px  0px 2px #fff,
                 0px -1px 2px #fff`,
  fontWeight: 'bold',
  backgroundColor: '#EEE',
  background: `radial-gradient(
    ellipse at center,
    #ff0080 0%,
    #ff8c00 ${Math.abs(value) % 100 - 50}%,
    #40e0d0 ${Math.abs(value) % 100}%
  )`,
  borderRadius: '50%',
})

export default Counter
