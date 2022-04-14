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
import { getComparableSuiteResult } from './test-utils.spec'

describe('deca', function () {
  describe('raw Suite', function () {
    it('test suite run order', async function () {
      assert.deepStrictEqual(TestSuiteRunOrder.hasRun, [])
      const res = await TestSuiteRunOrder.run()
      assert.strictEqual(res.success, true)
      assert.deepStrictEqual(TestSuiteRunOrder.hasRun, TestSuiteRunOrder.expectedRun)
    })
    it('test suite with skipped', async function () {
      assert.deepStrictEqual(TestSuiteSkip.hasRun, [])
      const res = await TestSuiteSkip.run()
      assert.strictEqual(res.success, true)
      assert.deepStrictEqual(TestSuiteSkip.hasRun, TestSuiteSkip.expectedRun)
    })
    it('test suite with only', async function () {
      assert.deepStrictEqual(TestSuiteOnly.hasRun, [])
      const res = await TestSuiteOnly.run()
      assert.strictEqual(res.success, true)
      assert.deepStrictEqual(TestSuiteOnly.hasRun, TestSuiteOnly.expectedRun)
    })
    it('test suite with errors', async function () {
      assert.deepStrictEqual(TestSuiteErrors.hasRun, [])
      const res = await TestSuiteErrors.run()
      assert.strictEqual(res.success, false)
      assert.deepStrictEqual(TestSuiteErrors.hasRun, TestSuiteErrors.expectedRun)
    })
    it('test suite async', async function () {
      assert.deepStrictEqual(TestSuiteAsync.hasRun, [])
      const res = await TestSuiteAsync.run()
      assert.strictEqual(res.success, false)
      assert.deepStrictEqual(TestSuiteAsync.hasRun, TestSuiteAsync.expectedRun)
    })
  })
  describe('BDD interface', function () {
    it('test bdd run order', async function () {
      assert.deepStrictEqual(TestBddRunOrder.hasRun, [])
      const res = await TestBddRunOrder.run()
      assert.strictEqual(res.success, true)
      assert.deepStrictEqual(TestBddRunOrder.hasRun, TestBddRunOrder.expectedRun)
    })
    it('test bdd with skipped', async function () {
      assert.deepStrictEqual(TestBddSkip.hasRun, [])
      const res = await TestBddSkip.run()
      assert.strictEqual(res.success, true)
      assert.deepStrictEqual(TestBddSkip.hasRun, TestBddSkip.expectedRun)
    })
    it('test bdd with only', async function () {
      assert.deepStrictEqual(TestBddOnly.hasRun, [])
      const res = await TestBddOnly.run()
      assert.strictEqual(res.success, true)
      assert.deepStrictEqual(TestBddOnly.hasRun, TestBddOnly.expectedRun)
    })
    it('test bdd with errors', async function () {
      assert.deepStrictEqual(TestBddError.hasRun, [])
      const res = await TestBddError.run()
      assert.strictEqual(res.success, false)
      assert.deepStrictEqual(TestBddError.hasRun, TestBddError.expectedRun)
    })
    it('test bdd async', async function () {
      assert.deepStrictEqual(TestBddAsync.hasRun, [])
      const res = await TestBddAsync.run()
      assert.strictEqual(res.success, false)
      assert.deepStrictEqual(TestBddAsync.hasRun, TestBddAsync.expectedRun)
      assert.deepStrictEqual(getComparableSuiteResult(res.result), TestBddAsync.expectedResult)
    })
    it('test bdd async-old', async function () {
      assert.deepStrictEqual(TestBddAsyncOld.hasRun, [])
      const res = await TestBddAsyncOld.run()
      assert.strictEqual(res.success, false)
      assert.deepStrictEqual(TestBddAsyncOld.hasRun, TestBddAsyncOld.expectedRun)
    })
  })
})
