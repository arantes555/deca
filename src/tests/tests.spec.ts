import * as TestSuiteRunOrder from './test-files/test-suite-run-order'
import * as TestSuiteSkip from './test-files/test-suite-skip'
import * as TestSuiteOnly from './test-files/test-suite-only'
import * as TestSuiteErrors from './test-files/test-suite-error'
import * as TestBddRunOrder from './test-files/test-bdd-run-order'
import * as TestBddSkip from './test-files/test-bdd-skip'
import * as TestBddOnly from './test-files/test-bdd-only'
import * as TestBddError from './test-files/test-bdd-error'
import assert from 'assert'

describe('deca', function () {
  describe('raw Suite', function () {
    it('test suite run order', async function () {
      assert.deepStrictEqual(TestSuiteRunOrder.hasRun, [])
      const success = await TestSuiteRunOrder.run()
      assert.strictEqual(success, true)
      assert.deepStrictEqual(TestSuiteRunOrder.hasRun, TestSuiteRunOrder.expectedRun)
    })
    it('test suite with skipped', async function () {
      assert.deepStrictEqual(TestSuiteSkip.hasRun, [])
      const success = await TestSuiteSkip.run()
      assert.strictEqual(success, true)
      assert.deepStrictEqual(TestSuiteSkip.hasRun, TestSuiteSkip.expectedRun)
    })
    it('test suite with only', async function () {
      assert.deepStrictEqual(TestSuiteOnly.hasRun, [])
      const success = await TestSuiteOnly.run()
      assert.strictEqual(success, true)
      assert.deepStrictEqual(TestSuiteOnly.hasRun, TestSuiteOnly.expectedRun)
    })
    it('test suite with errors', async function () {
      assert.deepStrictEqual(TestSuiteErrors.hasRun, [])
      const success = await TestSuiteErrors.run()
      assert.strictEqual(success, false)
      assert.deepStrictEqual(TestSuiteErrors.hasRun, TestSuiteErrors.expectedRun)
    })
  })
  describe('BDD interface', function () {
    it('test suite run order', async function () {
      assert.deepStrictEqual(TestBddRunOrder.hasRun, [])
      const success = await TestBddRunOrder.run()
      assert.strictEqual(success, true)
      assert.deepStrictEqual(TestBddRunOrder.hasRun, TestBddRunOrder.expectedRun)
    })
    it('test suite with skipped', async function () {
      assert.deepStrictEqual(TestBddSkip.hasRun, [])
      const success = await TestBddSkip.run()
      assert.strictEqual(success, true)
      assert.deepStrictEqual(TestBddSkip.hasRun, TestBddSkip.expectedRun)
    })
    it('test suite with only', async function () {
      assert.deepStrictEqual(TestBddOnly.hasRun, [])
      const success = await TestBddOnly.run()
      assert.strictEqual(success, true)
      assert.deepStrictEqual(TestBddOnly.hasRun, TestBddOnly.expectedRun)
    })
    it('test suite with errors', async function () {
      assert.deepStrictEqual(TestBddError.hasRun, [])
      const success = await TestBddError.run()
      assert.strictEqual(success, false)
      assert.deepStrictEqual(TestBddError.hasRun, TestBddError.expectedRun)
    })
  })
})
