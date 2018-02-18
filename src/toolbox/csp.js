export const channel = () => ({ takers: [], messages: [] })

export const put = (ch, msg) =>
  new Promise(resolve => {
    ch.messages.unshift({ putter: resolve, content: msg })
    tryTake(ch)
  })

export const take = ch =>
  new Promise(resolve => {
    ch.takers.unshift(({ content, putter }) => putter(resolve(content)))
    tryTake(ch)
  })

const tryTake = ({ takers, messages }) => {
  if (messages.length && takers.length) {
    const [msg, taker] = [messages.pop(), takers.pop()]
    taker(msg)
  }
}
