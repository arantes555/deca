import { describe, it, before, after, beforeEach, afterEach, resetGlobalSuite } from '../../../lib/bdd'
import { ComparableSuiteResult } from '../../test-utils.spec'

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

  before('before1', function (done) {
    hasRun.push('before1')
    setTimeout(() => done(), 10)
  })
  after('after1', function (done) {
    hasRun.push('after1')
    setTimeout(() => done(), 10)
  })
  before('before2', function (done) {
    hasRun.push('before2')
    setTimeout(() => done(), 10) // This is less than the wait in before1, to make sure before1 is finished before we start before2
  })
  after('after2', function (done) {
    hasRun.push('after2')
    setTimeout(() => done(), 5)
  })

  describe('suite with hooks', function () {
    beforeEach('beforeEach1', function (done) {
      hasRun.push('beforeEach1')
      setTimeout(() => done(), 10)
    })
    afterEach('afterEach1', function (done) {
      hasRun.push('afterEach1')
      setTimeout(() => done(), 10)
    })

    it('suite-hooks-test1', function (done) {
      hasRun.push('suite-hooks-test1')
      done()
    })

    beforeEach('beforeEach2', function (done) {
      hasRun.push('beforeEach2')
      setTimeout(() => done(), 5)
    })
    afterEach('afterEach2', function (done) {
      hasRun.push('afterEach2')
      setTimeout(() => done(), 5)
    })
  })

  describe('suite with default timeout', function () {
    it('suite-default-timeout-test1', function () { hasRun.push('suite-default-timeout-test1') })
    it('suite-default-timeout-test2', function (done) {
      hasRun.push('suite-default-timeout-test2')
      setTimeout(() => done(), 5)
    })
    it('suite-default-timeout-test3', function (done) {
      hasRun.push('suite-default-timeout-test3')
      setTimeout(() => done(new Error('suite-default-timeout-test3')), 5)
    })
    it('suite-default-timeout-test4', function (done) {
      this.timeout(5)
      hasRun.push('suite-default-timeout-test4')
      setTimeout(() => done(), 100)
    })
  })

  describe('suite with short timeout', function () {
    this.timeout(5)
    it('suite-short-timeout-test1', function (done) {
      hasRun.push('suite-short-timeout-test1')
      done()
    })
    it('suite-short-timeout-test2', function (done) {
      hasRun.push('suite-short-timeout-test2')
      setTimeout(() => done(), 100)
    })
    it('suite-short-timeout-test3', function (done) {
      this.timeout(20)
      hasRun.push('suite-short-timeout-test3')
      setTimeout(() => done(), 10)
    })
  })

  describe('suite with long timeout', function () {
    this.timeout(50)
    it('suite-long-timeout-test1', function (done) {
      hasRun.push('suite-long-timeout-test1')
      done()
    })
    it('suite-long-timeout-test2', function (done) {
      this.timeout(10)
      hasRun.push('suite-long-timeout-test2')
      setTimeout(() => done(), 20)
    })
  })

  return suite.run()
}
