import { noop, TestFunc, timeout } from './utils'

export class Test {
  name: string
  func: TestFunc
  timeout_: number
  hasRun: boolean
  success: boolean
  skipped = false
  only = false

  static create (
    name: string,
    func: TestFunc,
    { timeout = 3000, skipped = false, only = false }: { timeout?: number, skipped?: boolean, only?: boolean } = {}
  ): Test {
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

  async run (): Promise<void> {
    if (this.skipped) return
    try {
      const promise = this.func.bind(this)()
      // the function may modify the timeout *synchronously* by calling `this.timeout(t)`
      await Promise.race([
        promise,
        timeout(this.timeout_)
      ])
      this.hasRun = true
      this.success = true
    } catch (err) {
      this.hasRun = true
      this.success = false
      throw err
    }
  }
}

export class Suite {
  name = ''
  depth = 0
  before_?: Array<Test> = []
  after_?: Array<Test> = []
  beforeEach_?: Array<Test> = []
  afterEach_?: Array<Test> = []
  tests: Array<Test> = []
  children: Array<Suite> = []
  timeout_: number
  parent: Suite = null
  skipped = false
  only = false
  silent = false

  childrenHaveOnly (): boolean {
    return this.tests.some(t => t.only) || this.children.some(c => c.only || c.childrenHaveOnly())
  }

  timeout (t: number): void {
    this.timeout_ = t
  }

  before (name: string, fn: TestFunc): void {
    this.before_.push(Test.create(name, fn))
  }

  after (name: string, fn: TestFunc): void {
    this.after_.push(Test.create(name, fn))
  }

  beforeEach (name: string, fn: TestFunc): void {
    this.beforeEach_.push(Test.create(name, fn))
  }

  afterEach (name: string, fn: TestFunc): void {
    this.afterEach_.push(Test.create(name, fn))
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
    { timeout, skipped = false, only = false, silent = this.silent }: { timeout?: number, skipped?: boolean, only?: boolean, silent?: boolean } = {}
  ): void {
    const child = new Suite()
    child.name = name
    child.parent = this
    child.depth = this.depth + 1
    child.skipped = skipped
    child.timeout_ = timeout || this.timeout_
    child.only = only
    child.silent = silent
    this.children.push(child)
    func(child)
  }

  async runBefore (): Promise<void> {
    for (const hook of this.before_) {
      await hook.run()
    }
  }

  async runAfter (): Promise<void> {
    for (const hook of this.after_) {
      await hook.run()
    }
  }

  async runBeforeEach (): Promise<void> {
    if (this.parent) await this.parent.runBeforeEach()
    for (const hook of this.beforeEach_) {
      await hook.run()
    }
  }

  async runAfterEach (): Promise<void> {
    for (const hook of this.afterEach_) {
      await hook.run()
    }
    if (this.parent) await this.parent.runAfterEach()
  }

  async run (): Promise<boolean> {
    if (this.depth >= 0 && !this.silent) console.log(`${'  '.repeat(this.depth)}${this.name}`)
    if (this.skipped) return null
    try {
      let success = true
      await this.runBefore()
      const childrenHaveOnly = this.childrenHaveOnly()
      const testsToRun = childrenHaveOnly
        ? this.tests.filter(t => t.only)
        : this.tests
      for (const test of testsToRun) {
        if (test.skipped) {
          if (!this.silent) console.log(`${'  '.repeat(this.depth + 1)}➡️ ${test.name} (skipped)`)
          continue
        }
        await this.runBeforeEach()
        try {
          await test.run()
          if (!this.silent) console.log(`${'  '.repeat(this.depth + 1)}✅  ${test.name}`)
        } catch (testError) {
          if (!this.silent) console.error(`${'  '.repeat(this.depth + 1)}❌  ${test.name} (error)`)
          if (!this.silent) console.error(testError)
          success = false
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
    } catch (err) {
      if (!this.silent) console.error(`${'  '.repeat(this.depth + 1)}❌  Error while running one of the hooks`)
      if (!this.silent) console.error(err)
      return false
    }
  }
}
