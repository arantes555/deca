import { promisify } from 'util'

const timeout = (t: number) => new Promise((resolve, reject) => setTimeout(() => reject(new Error('Timeout')), t))
const noop = () => {} // eslint-disable-line @typescript-eslint/no-empty-function

type TestFunc = () => void | Promise<void>
type OldTestFunc = (done: (err?: Error | null) => void) => void

const testFuncWrapper = (func: OldTestFunc | TestFunc): TestFunc => {
  if (func.length === 0) {
    return func as TestFunc
  } else if (func.length === 1) {
    return promisify(func)
  } else {
    throw new Error('Invalid function : too many args')
  }
}

class Test {
  name: string
  func: TestFunc
  timeout_: number
  hasRun: boolean
  success: boolean

  static create (name: string, func: TestFunc, timeout: number) {
    const t = new this()
    t.name = name
    t.func = func
    t.timeout_ = timeout
    t.success = null
    t.hasRun = false
    return t
  }

  async run () {
    try {
      const promise = this.func.bind({
        timeout: (t: number) => {
          this.timeout_ = t
        }
      })() // the function may modify the timeout *synchronously* by calling `this.timeout(t)`
      await Promise.race([
        promise,
        timeout(this.timeout_)
      ])
      this.hasRun = true
      this.success = true
      return null
    } catch (err) {
      this.hasRun = true
      this.success = false
      return err
    }
  }
}

export class Suite {
  name = ''
  depth = 0
  before_?: Array<TestFunc> = []
  after_?: Array<TestFunc> = []
  beforeEach_?: Array<TestFunc> = []
  afterEach_?: Array<TestFunc> = []
  tests: Array<Test> = []
  children: Array<Suite> = []
  timeout_: number
  parent: Suite = null

  static ctx: Suite = null

  timeout (t: number): void {
    this.timeout_ = t
  }

  before (arg1: string | TestFunc | OldTestFunc, arg2: TestFunc | OldTestFunc = noop): void {
    if (typeof arg1 === 'string') this.before_.push(testFuncWrapper(arg2))
    else this.before_.push(testFuncWrapper(arg1))
  }

  after (arg1: string | TestFunc | OldTestFunc, arg2: TestFunc | OldTestFunc = noop): void {
    if (typeof arg1 === 'string') this.after_.push(testFuncWrapper(arg2))
    else this.after_.push(testFuncWrapper(arg1))
  }

  beforeEach (arg1: string | TestFunc | OldTestFunc, arg2: TestFunc | OldTestFunc = noop): void {
    if (typeof arg1 === 'string') this.beforeEach_.push(testFuncWrapper(arg2))
    else this.beforeEach_.push(testFuncWrapper(arg1))
  }

  afterEach (arg1: string | TestFunc | OldTestFunc, arg2: TestFunc | OldTestFunc = noop): void {
    if (typeof arg1 === 'string') this.afterEach_.push(testFuncWrapper(arg2))
    else this.afterEach_.push(testFuncWrapper(arg1))
  }

  it (name: string, func: TestFunc | OldTestFunc = noop): void {
    this.tests.push(Test.create(name, testFuncWrapper(func), this.timeout_))
  }

  describe (name: string, func: (ctx?: Suite) => void): void {
    const child = new Suite()
    child.name = name
    child.parent = this
    child.depth = this.depth + 1
    this.children.push(child)
    Suite.ctx = child
    func.bind(child)(child)
    Suite.ctx = this
  }

  async runBefore () {
    await Promise.all([this.before_.map(fn => fn())])
  }

  async runAfter () {
    await Promise.all([this.after_.map(fn => fn())])
  }

  async runBeforeEach () {
    if (this.parent) await this.parent.runBeforeEach()
    await Promise.all([this.beforeEach_.map(fn => fn())])
  }

  async runAfterEach () {
    await Promise.all([this.afterEach_.map(fn => fn())])
    if (this.parent) await this.parent.runAfterEach()
  }

  async run () {
    console.log(`${'  '.repeat(this.depth)}${this.name}`)
    let success = true
    await this.runBefore()
    for (const test of this.tests) {
      await this.runBeforeEach()
      const testError = await test.run()
      if (testError) {
        console.error(`${'  '.repeat(this.depth + 1)}❌ ${test.name}`)
        console.error(testError)
        success = false
      } else {
        console.log(`${'  '.repeat(this.depth + 1)}✅ ${test.name}`)
      }
      await this.runAfterEach()
    }
    for (const child of this.children) {
      const childSuiteSuccess = await child.run()
      if (childSuiteSuccess === false) success = false
    }
    await this.runAfter()
    return success
  }
}

export const globalSuite = new Suite()
Suite.ctx = globalSuite

export function describe (name: string, func: (ctx?: Suite) => void): void {
  Suite.ctx.describe(name, func)
}

export function it (name: string, func?: TestFunc | OldTestFunc) : void {
  Suite.ctx.it(name, func)
}

export function before (arg1: string | TestFunc | OldTestFunc, arg2: TestFunc | OldTestFunc = noop): void {
  Suite.ctx.before(arg1, arg2)
}

export function after (arg1: string | TestFunc | OldTestFunc, arg2: TestFunc | OldTestFunc = noop): void {
  Suite.ctx.after(arg1, arg2)
}

export function beforeEach (arg1: string | TestFunc | OldTestFunc, arg2: TestFunc | OldTestFunc = noop): void {
  Suite.ctx.beforeEach(arg1, arg2)
}

export function afterEach (arg1: string | TestFunc | OldTestFunc, arg2: TestFunc | OldTestFunc = noop): void {
  Suite.ctx.afterEach(arg1, arg2)
}

setTimeout(async () => {
  const success = await globalSuite.run()
  if (success === false) if (global.process) global.process.exitCode = 1
}, 0)
