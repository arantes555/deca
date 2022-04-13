import { Suite } from './suite.js'
import { noop, OldTestFunc, TestFunc, testFuncWrapper } from './utils'

let globalSuite: Suite
let globalCtx: Suite

export const getGlobalSuite = () => globalSuite
export const resetGlobalSuite = (): Suite => {
  globalSuite = new Suite()
  globalSuite.depth = -1
  globalCtx = globalSuite
  return globalSuite
}
resetGlobalSuite()

const addSubSuite = (
  name: string,
  func: (this: Suite) => void,
  { skipped = false, only = false }: { skipped?: boolean, only?: boolean } = {}
) => {
  const previousGlobalCtx = globalCtx
  globalCtx.addSubSuite(
    name,
    (ctx) => {
      globalCtx = ctx
      func.bind(ctx)()
      globalCtx = previousGlobalCtx
    },
    { skipped, only }
  )
}

export function describe (name: string, func: (this: Suite) => void): void {
  addSubSuite(name, func)
}

describe.skip = function describeSkip (name: string, func: (this: Suite) => void): void {
  addSubSuite(name, func, { skipped: true })
}

describe.only = function describeOnly (name: string, func: (this: Suite) => void): void {
  addSubSuite(name, func, { only: true })
}

export function it (name: string, func?: TestFunc | OldTestFunc): void {
  globalCtx.addTest(name, testFuncWrapper(func))
}

it.skip = function itSkip (name: string, func?: TestFunc | OldTestFunc): void {
  globalCtx.addTest(name, testFuncWrapper(func), { skipped: true })
}

it.only = function itOnly (name: string, func?: TestFunc | OldTestFunc): void {
  globalCtx.addTest(name, testFuncWrapper(func), { only: true })
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
