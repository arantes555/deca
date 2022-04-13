import { promisify } from 'util'

export const timeout = (t: number) => new Promise((resolve, reject) => setTimeout(() => reject(new Error('Timeout')), t))
export const noop = () => {} // eslint-disable-line @typescript-eslint/no-empty-function

export type TestFunc = () => void | Promise<void>
export type OldTestFunc = (done: (err?: Error | null) => void) => void

export const testFuncWrapper = (func: OldTestFunc | TestFunc): TestFunc => {
  if (func.length === 0) {
    return func as TestFunc
  } else if (func.length === 1) {
    return promisify(func)
  } else {
    throw new Error('Invalid function : too many args')
  }
}
