import { describe, it, before, after, beforeEach, afterEach, resetGlobalSuite } from '../../../lib/bdd'
import { ComparableSuiteResult, wait } from '../../test-utils.spec'

export const hasRun: Array<string> = []

export const expectedRun = [
  'before1',
  'before2',

  'beforeEach1',
  'beforeEach2',
  'suite-hooks-test1',
  'afterEach1',
  'afterEach2',

  'suite-default-timeout-test1',
  'suite-default-timeout-test2',
  'suite-default-timeout-test3',
  'suite-default-timeout-test4',

  'suite-short-timeout-test1',
  'suite-short-timeout-test2',
  'suite-short-timeout-test3',

  'suite-long-timeout-test1',
  'suite-long-timeout-test2',

  'after1',
  'after2'
]

export const expectedResult: ComparableSuiteResult = {
  name: '',
  skipped: false,
  tests: [],
  subSuites: [
    {
      name: 'suite with hooks',
      skipped: false,
      tests: [
        { name: 'suite-hooks-test1', skipped: false, error: null }
      ],
      subSuites: []
    },
    {
      name: 'suite with default timeout',
      skipped: false,
      tests: [
        { name: 'suite-default-timeout-test1', skipped: false, error: null },
        { name: 'suite-default-timeout-test2', skipped: false, error: null },
        { name: 'suite-default-timeout-test3', skipped: false, error: 'Error: suite-default-timeout-test3' },
        { name: 'suite-default-timeout-test4', skipped: false, error: 'Error: Timeout' }
      ],
      subSuites: []
    },
    {
      name: 'suite with short timeout',
      skipped: false,
      tests: [
        { name: 'suite-short-timeout-test1', skipped: false, error: null },
        { name: 'suite-short-timeout-test2', skipped: false, error: 'Error: Timeout' },
        { name: 'suite-short-timeout-test3', skipped: false, error: null }
      ],
      subSuites: []
    },
    {
      name: 'suite with long timeout',
      skipped: false,
      tests: [
        { name: 'suite-long-timeout-test1', skipped: false, error: null },
        { name: 'suite-long-timeout-test2', skipped: false, error: 'Error: Timeout' }
      ],
      subSuites: []
    }
  ]
}

export const run = () => {
  const suite = resetGlobalSuite()

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

  describe('suite with hooks', function () {
    beforeEach('beforeEach1', async function () {
      await wait(10)
      hasRun.push('beforeEach1')
    })
    afterEach('afterEach1', async function () {
      await wait(10)
      hasRun.push('afterEach1')
    })

    it('suite-hooks-test1', async function () { hasRun.push('suite-hooks-test1') })

    beforeEach('beforeEach2', async function () {
      await wait(5)
      hasRun.push('beforeEach2')
    })
    afterEach('afterEach2', async function () {
      await wait(5)
      hasRun.push('afterEach2')
    })
  })

  describe('suite with default timeout', function () {
    it('suite-default-timeout-test1', function () { hasRun.push('suite-default-timeout-test1') })
    it('suite-default-timeout-test2', async function () {
      await wait(5)
      hasRun.push('suite-default-timeout-test2')
    })
    it('suite-default-timeout-test3', async function () {
      await wait(5)
      hasRun.push('suite-default-timeout-test3')
      throw new Error('suite-default-timeout-test3')
    })
    it('suite-default-timeout-test4', async function () {
      this.timeout(5)
      hasRun.push('suite-default-timeout-test4')
      await wait(100)
    })
  })

  describe('suite with short timeout', function () {
    this.timeout(5)
    it('suite-short-timeout-test1', async function () { hasRun.push('suite-short-timeout-test1') })
    it('suite-short-timeout-test2', async function () {
      hasRun.push('suite-short-timeout-test2')
      await wait(100)
    })
    it('suite-short-timeout-test3', async function () {
      this.timeout(20)
      hasRun.push('suite-short-timeout-test3')
      await wait(10)
    })
  })

  describe('suite with long timeout', function () {
    this.timeout(50)
    it('suite-long-timeout-test1', async function () { hasRun.push('suite-long-timeout-test1') })
    it('suite-long-timeout-test2', async function () {
      this.timeout(10)
      hasRun.push('suite-long-timeout-test2')
      await wait(20)
    })
  })

  return suite.run()
}
