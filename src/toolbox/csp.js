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

export const map = mappingFunction => inChan => {
  const outChan = channel()
  ;(async () => {
    while (true) {
      const inMsg = await take(inChan)
      const outMsg = await mappingFunction(inMsg)
      await put(outChan, outMsg)
    }
  })()

  return outChan
}

export const filter = predicate => inChan => {
  const outChan = channel()
  ;(async () => {
    while (true) {
      const msg = await take(inChan)
      ;(await predicate(msg)) && put(outChan, msg)
    }
  })()

  return outChan
}

const tryTake = ({ takers, messages }) => {
  if (messages.length && takers.length) {
    const [msg, taker] = [messages.pop(), takers.pop()]
    taker(msg)
  }
}
