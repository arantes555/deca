import { describe, it, before, after, beforeEach, afterEach, resetGlobalSuite } from '../../../lib/bdd'
import { ComparableSuiteResult, wait } from '../../test-utils.spec'

export const hasRun: Array<string> = []

export const expectedRun = [
  'before1',
  'before2',

  'beforeEach1',
  'beforeEach2',
  'internal-hooks-test1',
  'afterEach1',
  'afterEach2',

  'internal-default-timeout-test1',
  'internal-default-timeout-test2',
  'internal-default-timeout-test3',
  'internal-default-timeout-test4',

  'internal-short-timeout-test1',
  'internal-short-timeout-test2',
  'internal-short-timeout-test3',

  'internal-long-timeout-test1',
  'internal-long-timeout-test2',

  'after1',
  'after2'
]

export const expectedResult: ComparableSuiteResult = {
  name: '',
  skipped: false,
  tests: [],
  subSuites: [
    {
      name: 'test-bdd-async',
      skipped: false,
      tests: [],
      subSuites: [
        {
          name: 'internal with hooks',
          skipped: false,
          tests: [
            { name: 'internal-hooks-test1', skipped: false, error: null }
          ],
          subSuites: []
        },
        {
          name: 'internal with default timeout',
          skipped: false,
          tests: [
            { name: 'internal-default-timeout-test1', skipped: false, error: null },
            { name: 'internal-default-timeout-test2', skipped: false, error: null },
            { name: 'internal-default-timeout-test3', skipped: false, error: 'Error: internal-default-timeout-test3' },
            { name: 'internal-default-timeout-test4', skipped: false, error: 'Error: Timeout' }
          ],
          subSuites: []
        },
        {
          name: 'internal with short timeout',
          skipped: false,
          tests: [
            { name: 'internal-short-timeout-test1', skipped: false, error: null },
            { name: 'internal-short-timeout-test2', skipped: false, error: 'Error: Timeout' },
            { name: 'internal-short-timeout-test3', skipped: false, error: null }
          ],
          subSuites: []
        },
        {
          name: 'internal with long timeout',
          skipped: false,
          tests: [
            { name: 'internal-long-timeout-test1', skipped: false, error: null },
            { name: 'internal-long-timeout-test2', skipped: false, error: 'Error: Timeout' }
          ],
          subSuites: []
        }
      ]
    }
  ]
}

export const run = function () {
  const suite = resetGlobalSuite()

  describe('test-bdd-async', function () {
    before('before1', async function () {
      await wait(10)
      hasRun.push('before1')
    })
    after('after1', async function () {
      await wait(10)
      hasRun.push('after1')
    })
    before('before2', async function () {
      await wait(5) // This is less than the wait in before1, to make sure before1 is finished before we start before2
      hasRun.push('before2')
    })
    after('after2', async function () {
      await wait(5)
      hasRun.push('after2')
    })

    describe('internal with hooks', function () {
      beforeEach('beforeEach1', async function () {
        await wait(10)
        hasRun.push('beforeEach1')
      })
      afterEach('afterEach1', async function () {
        await wait(10)
        hasRun.push('afterEach1')
      })

      it('internal-hooks-test1', async function () { hasRun.push('internal-hooks-test1') })

      beforeEach('beforeEach2', async function () {
        await wait(5)
        hasRun.push('beforeEach2')
      })
      afterEach('afterEach2', async function () {
        await wait(5)
        hasRun.push('afterEach2')
      })
    })

    describe('internal with default timeout', function () {
      it('internal-default-timeout-test1', function () { hasRun.push('internal-default-timeout-test1') })
      it('internal-default-timeout-test2', async function () {
        await wait(5)
        hasRun.push('internal-default-timeout-test2')
      })
      it('internal-default-timeout-test3', async function () {
        await wait(5)
        hasRun.push('internal-default-timeout-test3')
        throw new Error('internal-default-timeout-test3')
      })
      it('internal-default-timeout-test4', async function () {
        this.timeout(5)
        hasRun.push('internal-default-timeout-test4')
        await wait(100)
      })
    })

    describe('internal with short timeout', function () {
      this.timeout(5)
      it('internal-short-timeout-test1', async function () { hasRun.push('internal-short-timeout-test1') })
      it('internal-short-timeout-test2', async function () {
        hasRun.push('internal-short-timeout-test2')
        await wait(100)
      })
      it('internal-short-timeout-test3', async function () {
        this.timeout(20)
        hasRun.push('internal-short-timeout-test3')
        await wait(10)
      })
    })

    describe('internal with long timeout', function () {
      this.timeout(50)
      it('internal-long-timeout-test1', async function () { hasRun.push('internal-long-timeout-test1') })
      it('internal-long-timeout-test2', async function () {
        this.timeout(10)
        hasRun.push('internal-long-timeout-test2')
        await wait(20)
      })
    })
  })

  return suite.run()
}
