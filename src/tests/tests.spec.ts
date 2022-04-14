import assert from 'assert'
import { getComparableSuiteResult } from './test-utils.spec'

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

describe('deca', function () {
  describe('raw Suite', function () {
    it('test suite run order', async function () {
      assert.deepStrictEqual(TestSuiteRunOrder.hasRun, [])
      const result = await TestSuiteRunOrder.run()
      assert.deepStrictEqual(TestSuiteRunOrder.hasRun, TestSuiteRunOrder.expectedRun)
      assert.deepStrictEqual(getComparableSuiteResult(result), TestSuiteRunOrder.expectedResult)
    })
    it('test suite with skipped', async function () {
      assert.deepStrictEqual(TestSuiteSkip.hasRun, [])
      const result = await TestSuiteSkip.run()
      assert.deepStrictEqual(TestSuiteSkip.hasRun, TestSuiteSkip.expectedRun)
      assert.deepStrictEqual(getComparableSuiteResult(result), TestSuiteSkip.expectedResult)
    })
    it('test suite with only', async function () {
      assert.deepStrictEqual(TestSuiteOnly.hasRun, [])
      const result = await TestSuiteOnly.run()
      assert.deepStrictEqual(TestSuiteOnly.hasRun, TestSuiteOnly.expectedRun)
      assert.deepStrictEqual(getComparableSuiteResult(result), TestSuiteOnly.expectedResult)
    })
    it('test suite with errors', async function () {
      assert.deepStrictEqual(TestSuiteErrors.hasRun, [])
      const result = await TestSuiteErrors.run()
      assert.deepStrictEqual(TestSuiteErrors.hasRun, TestSuiteErrors.expectedRun)
      assert.deepStrictEqual(getComparableSuiteResult(result), TestSuiteErrors.expectedResult)
    })
    it('test suite async', async function () {
      assert.deepStrictEqual(TestSuiteAsync.hasRun, [])
      const result = await TestSuiteAsync.run()
      assert.deepStrictEqual(TestSuiteAsync.hasRun, TestSuiteAsync.expectedRun)
      assert.deepStrictEqual(getComparableSuiteResult(result), TestSuiteAsync.expectedResult)
    })
  })
  describe('BDD interface', function () {
    it('test bdd run order', async function () {
      assert.deepStrictEqual(TestBddRunOrder.hasRun, [])
      const result = await TestBddRunOrder.run()
      assert.deepStrictEqual(TestBddRunOrder.hasRun, TestBddRunOrder.expectedRun)
      assert.deepStrictEqual(getComparableSuiteResult(result), TestBddRunOrder.expectedResult)
    })
    it('test bdd with skipped', async function () {
      assert.deepStrictEqual(TestBddSkip.hasRun, [])
      const result = await TestBddSkip.run()
      assert.deepStrictEqual(TestBddSkip.hasRun, TestBddSkip.expectedRun)
      assert.deepStrictEqual(getComparableSuiteResult(result), TestBddSkip.expectedResult)
    })
    it('test bdd with only', async function () {
      assert.deepStrictEqual(TestBddOnly.hasRun, [])
      const result = await TestBddOnly.run()
      assert.deepStrictEqual(TestBddOnly.hasRun, TestBddOnly.expectedRun)
      assert.deepStrictEqual(getComparableSuiteResult(result), TestBddOnly.expectedResult)
    })
    it('test bdd with errors', async function () {
      assert.deepStrictEqual(TestBddError.hasRun, [])
      const result = await TestBddError.run()
      assert.deepStrictEqual(TestBddError.hasRun, TestBddError.expectedRun)
      assert.deepStrictEqual(getComparableSuiteResult(result), TestBddError.expectedResult)
    })
    it('test bdd async', async function () {
      assert.deepStrictEqual(TestBddAsync.hasRun, [])
      const result = await TestBddAsync.run()
      assert.deepStrictEqual(TestBddAsync.hasRun, TestBddAsync.expectedRun)
      assert.deepStrictEqual(getComparableSuiteResult(result), TestBddAsync.expectedResult)
    })
    it('test bdd async-old', async function () {
      assert.deepStrictEqual(TestBddAsyncOld.hasRun, [])
      const result = await TestBddAsyncOld.run()
      assert.deepStrictEqual(TestBddAsyncOld.hasRun, TestBddAsyncOld.expectedRun)
      assert.deepStrictEqual(getComparableSuiteResult(result), TestBddAsyncOld.expectedResult)
    })
  })
})
