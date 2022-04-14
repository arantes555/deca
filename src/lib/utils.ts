import { Test } from './suite'

export const timeout = (t: number) => new Promise((resolve, reject) => setTimeout(() => reject(new Error('Timeout')), t))
export const noop = () => {} // eslint-disable-line @typescript-eslint/no-empty-function

export type TestFunc = (this: Test) => void | Promise<void>
export type OldTestFunc = (this: Test, done: (err?: Error | null) => void) => void
export const promisifyTestFunc = function (func: OldTestFunc): TestFunc {
  return function () {
    return new Promise((resolve, reject) =>
      func.bind(this)((err?: Error) => err ? reject(err) : resolve())
    )
  }
}

export const testFuncWrapper = (func: OldTestFunc | TestFunc): TestFunc => {
  if (func.length === 0) {
    return func as TestFunc
  } else if (func.length === 1) {
    return promisifyTestFunc(func)
  } else {
    throw new Error('Invalid function : too many args')
  }
}
