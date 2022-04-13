import * as TestSuiteRunOrder from './test-files/test-suite-run-order'
import * as TestSuiteSkip from './test-files/test-suite-skip'
import * as TestSuiteOnly from './test-files/test-suite-only'
import * as TestBddRunOrder from './test-files/test-bdd-run-order'
import * as TestBddSkip from './test-files/test-bdd-skip'
import * as TestBddOnly from './test-files/test-bdd-only'
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
  })
})
