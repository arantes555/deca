import { noop, TestFunc, timeout } from './utils'

class Test {
  name: string
  func: TestFunc
  timeout_: number
  hasRun: boolean
  success: boolean
  skipped = false
  only = false

  static create (name: string, func: TestFunc, {
    timeout = 3000,
    skipped = false,
    only = false
  }: { timeout?: number, skipped?: boolean, only?: boolean } = {}) {
    const t = new this()
    t.name = name
    t.func = func
    t.timeout_ = timeout
    t.success = null
    t.hasRun = false
    t.skipped = skipped
    t.only = only
    return t
  }

  async run () {
    if (this.skipped) return
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
  skipped = false
  only = false

  childrenHaveOnly (): boolean {
    return this.tests.some(t => t.only) || this.children.some(c => c.only || c.childrenHaveOnly())
  }

  timeout (t: number): void {
    this.timeout_ = t
  }

  clear (): void {
    this.before_ = []
    this.after_ = []
    this.beforeEach_ = []
    this.afterEach_ = []
    this.tests = []
    this.children = []
  }

  before (name: string, fn: TestFunc): void {
    this.before_.push(fn) // TODO: handle name properly
  }

  after (name: string, fn: TestFunc): void {
    this.after_.push(fn) // TODO: handle name properly
  }

  beforeEach (name: string, fn: TestFunc): void {
    this.beforeEach_.push(fn) // TODO: handle name properly
  }

  afterEach (name: string, fn: TestFunc): void {
    this.afterEach_.push(fn) // TODO: handle name properly
  }

  addTest (
    name: string,
    func: TestFunc = noop,
    { timeout, skipped = false, only = false }: { timeout?: number, skipped?: boolean, only?: boolean } = {}
  ): void {
    this.tests.push(Test.create(name, func, { timeout: timeout || this.timeout_, skipped, only }))
  }

  addSubSuite (
    name: string,
    func: (ctx?: Suite) => void,
    { timeout, skipped = false, only = false }: { timeout?: number, skipped?: boolean, only?: boolean } = {}
  ): void {
    const child = new Suite()
    child.name = name
    child.parent = this
    child.depth = this.depth + 1
    child.skipped = skipped
    child.timeout_ = timeout || this.timeout_
    child.only = only
    this.children.push(child)
    func(child)
  }

  async runBefore (): Promise<void> {
    await Promise.all([this.before_.map(fn => fn())])
  }

  async runAfter (): Promise<void> {
    await Promise.all([this.after_.map(fn => fn())])
  }

  async runBeforeEach (): Promise<void> {
    if (this.parent) await this.parent.runBeforeEach()
    await Promise.all([this.beforeEach_.map(fn => fn())])
  }

  async runAfterEach (): Promise<void> {
    await Promise.all([this.afterEach_.map(fn => fn())])
    if (this.parent) await this.parent.runAfterEach()
  }

  async run (): Promise<boolean> {
    if (this.depth >= 0) console.log(`${'  '.repeat(this.depth)}${this.name}`)
    if (this.skipped) return null
    let success = true
    await this.runBefore()
    const childrenHaveOnly = this.childrenHaveOnly()
    const testsToRun = childrenHaveOnly
      ? this.tests.filter(t => t.only)
      : this.tests
    for (const test of testsToRun) {
      if (test.skipped) {
        console.log(`${'  '.repeat(this.depth + 1)}➡️ ${test.name} (skipped)`)
        continue
      }
      await this.runBeforeEach()
      const testError = await test.run()
      if (testError) {
        console.error(`${'  '.repeat(this.depth + 1)}❌  ${test.name} (error)`)
        console.error(testError)
        success = false
      } else {
        console.log(`${'  '.repeat(this.depth + 1)}✅  ${test.name}`)
      }
      await this.runAfterEach()
    }
    const subSuitesToRun = childrenHaveOnly
      ? this.children.filter(c => c.only || c.childrenHaveOnly())
      : this.children
    for (const child of subSuitesToRun) {
      const childSuiteSuccess = await child.run()
      if (childSuiteSuccess === false) success = false
    }
    await this.runAfter()
    return success
  }
}
