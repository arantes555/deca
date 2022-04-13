import { Suite } from './suite.js'
import { noop, OldTestFunc, TestFunc, testFuncWrapper } from './utils'

export const globalSuite = new Suite()
globalSuite.depth = -1
let globalCtx = globalSuite

export function describe (
  name: string,
  func: (ctx?: Suite) => void,
  { timeout, skipped = false }: { timeout?: number, skipped?: boolean } = {}
): void {
  const previousGlobalCtx = globalCtx
  globalCtx.addSubSuite(
    name,
    (ctx) => {
      globalCtx = ctx
      func.bind(ctx)(ctx)
      globalCtx = previousGlobalCtx
    },
    { timeout, skipped }
  )
}

describe.skip = function (name: string, func: (ctx?: Suite) => void, { timeout }: { timeout?: number } = {}): void {
  return describe(name, func, { timeout, skipped: true })
}

export function it (name: string, func?: TestFunc | OldTestFunc): void {
  globalCtx.addTest(name, testFuncWrapper(func))
}

const handleHookArgs = (arg1: string | TestFunc | OldTestFunc, arg2: TestFunc | OldTestFunc) => {
  let name = ''
  let fn: TestFunc
  if (typeof arg1 === 'string') {
    name = arg1
    fn = testFuncWrapper(arg2)
  } else {
    fn = testFuncWrapper(arg1)
  }
  return { name, fn }
}

export function before (arg1: string | TestFunc | OldTestFunc, arg2: TestFunc | OldTestFunc = noop): void {
  const { name, fn } = handleHookArgs(arg1, arg2)
  globalCtx.before(name, fn)
}

export function after (arg1: string | TestFunc | OldTestFunc, arg2: TestFunc | OldTestFunc = noop): void {
  const { name, fn } = handleHookArgs(arg1, arg2)
  globalCtx.after(name, fn)
}

export function beforeEach (arg1: string | TestFunc | OldTestFunc, arg2: TestFunc | OldTestFunc = noop): void {
  const { name, fn } = handleHookArgs(arg1, arg2)
  globalCtx.beforeEach(name, fn)
}

export function afterEach (arg1: string | TestFunc | OldTestFunc, arg2: TestFunc | OldTestFunc = noop): void {
  const { name, fn } = handleHookArgs(arg1, arg2)
  globalCtx.afterEach(name, fn)
}
