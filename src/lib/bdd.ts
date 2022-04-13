import { Suite } from './suite.js'
import { noop, OldTestFunc, TestFunc, testFuncWrapper } from './utils'

export const globalSuite = new Suite()
globalSuite.depth = -1
let globalCtx = globalSuite

export function describe (name: string, func: (this: Suite) => void): void {
  const previousGlobalCtx = globalCtx
  globalCtx.addSubSuite(
    name,
    (ctx) => {
      globalCtx = ctx
      func.bind(ctx)()
      globalCtx = previousGlobalCtx
    },
    { skipped: false }
  )
}

describe.skip = function describeSkip (name: string, func: (this: Suite) => void): void {
  const previousGlobalCtx = globalCtx
  globalCtx.addSubSuite(
    name,
    (ctx) => {
      globalCtx = ctx
      func.bind(ctx)()
      globalCtx = previousGlobalCtx
    },
    { skipped: true }
  )
}

export function it (name: string, func?: TestFunc | OldTestFunc): void {
  globalCtx.addTest(name, testFuncWrapper(func), { skipped: false })
}

it.skip = function itSkip (name: string, func?: TestFunc | OldTestFunc): void {
  globalCtx.addTest(name, testFuncWrapper(func), { skipped: true })
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
