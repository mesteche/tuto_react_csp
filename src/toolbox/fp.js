export const pipe = (...fns) => fns.reduce((f, g) => x => g(f(x)))
