import { noop, TestFunc, timeout } from './utils'

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

  timeout (t: number): void {
    this.timeout_ = t
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

  addTest (name: string, func: TestFunc = noop): void {
    this.tests.push(Test.create(name, func, this.timeout_))
  }

  addSubSuite (name: string, func: (ctx?: Suite) => void): void {
    const child = new Suite()
    child.name = name
    child.parent = this
    child.depth = this.depth + 1
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
