import * as TestSuiteRunOrder from './test-files/suite/run-order'
import * as TestSuiteSkip from './test-files/suite/skip'
import * as TestSuiteOnly from './test-files/suite/only'
import * as TestSuiteErrors from './test-files/suite/error'
import * as TestSuiteAsync from './test-files/suite/async'
import * as TestBddRunOrder from './test-files/bdd/run-order'
import * as TestBddSkip from './test-files/bdd/skip'
import * as TestBddOnly from './test-files/bdd/only'
import * as TestBddError from './test-files/bdd/error'
import * as TestBddAsync from './test-files/bdd/async'
import * as TestBddAsyncOld from './test-files/bdd/async-old'
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
    it('test suite async', async function () {
      assert.deepStrictEqual(TestSuiteAsync.hasRun, [])
      const success = await TestSuiteAsync.run()
      assert.strictEqual(success, false)
      assert.deepStrictEqual(TestSuiteAsync.hasRun, TestSuiteAsync.expectedRun)
    })
  })
  describe('BDD interface', function () {
    it('test bdd run order', async function () {
      assert.deepStrictEqual(TestBddRunOrder.hasRun, [])
      const success = await TestBddRunOrder.run()
      assert.strictEqual(success, true)
      assert.deepStrictEqual(TestBddRunOrder.hasRun, TestBddRunOrder.expectedRun)
    })
    it('test bdd with skipped', async function () {
      assert.deepStrictEqual(TestBddSkip.hasRun, [])
      const success = await TestBddSkip.run()
      assert.strictEqual(success, true)
      assert.deepStrictEqual(TestBddSkip.hasRun, TestBddSkip.expectedRun)
    })
    it('test bdd with only', async function () {
      assert.deepStrictEqual(TestBddOnly.hasRun, [])
      const success = await TestBddOnly.run()
      assert.strictEqual(success, true)
      assert.deepStrictEqual(TestBddOnly.hasRun, TestBddOnly.expectedRun)
    })
    it('test bdd with errors', async function () {
      assert.deepStrictEqual(TestBddError.hasRun, [])
      const success = await TestBddError.run()
      assert.strictEqual(success, false)
      assert.deepStrictEqual(TestBddError.hasRun, TestBddError.expectedRun)
    })
    it('test bdd async', async function () {
      assert.deepStrictEqual(TestBddAsync.hasRun, [])
      const success = await TestBddAsync.run()
      assert.strictEqual(success, false)
      assert.deepStrictEqual(TestBddAsync.hasRun, TestBddAsync.expectedRun)
    })
    it('test bdd async-old', async function () {
      assert.deepStrictEqual(TestBddAsyncOld.hasRun, [])
      const success = await TestBddAsyncOld.run()
      assert.strictEqual(success, false)
      assert.deepStrictEqual(TestBddAsyncOld.hasRun, TestBddAsyncOld.expectedRun)
    })
  })
})
