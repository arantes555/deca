import { Suite } from '../../../lib/suite'
import { ComparableSuiteResult } from '../../test-utils.spec'

export const hasRun: Array<string> = []

export const expectedRun = [
  'globalBefore',

  'before1',
  'before2',

  'beforeEach1',
  'beforeEach2',
  'test1',
  'afterEach1',
  'afterEach2',

  'beforeEach1',
  'beforeEach2',
  'test2',
  'afterEach1',
  'afterEach2',

  'internalBefore',

  'beforeEach1',
  'beforeEach2',
  'internalBeforeEach',
  'internalTest1',
  'internalAfterEach',
  'afterEach1',
  'afterEach2',

  'beforeEach1',
  'beforeEach2',
  'internalBeforeEach',
  'internalTest2',
  'internalAfterEach',
  'afterEach1',
  'afterEach2',

  'internalAfter',

  'after1',
  'after2',

  'globalAfter'
]

export const expectedResult: ComparableSuiteResult = {
  name: '',
  skipped: false,
  tests: [],
  subSuites: [
    {
      name: 'test-run-order',
      skipped: false,
      tests: [
        { name: 'test1', skipped: false, error: null },
        { name: 'test2', skipped: false, error: null }
      ],
      subSuites: [
        {
          name: 'internal',
          skipped: false,
          tests: [
            { name: 'internalTest1', skipped: false, error: null },
            { name: 'internalTest2', skipped: false, error: null }
          ],
          subSuites: []
        }
      ]
    }
  ]
}

export const run = () => {
  const mySuite = new Suite()

  mySuite.before('globalBefore', () => { hasRun.push('globalBefore') })
  mySuite.after('globalAfter', () => { hasRun.push('globalAfter') })

  mySuite.addSubSuite('test-run-order', (subSuite) => {
    subSuite.before('before1', () => { hasRun.push('before1') })
    subSuite.after('after1', () => { hasRun.push('after1') })
    subSuite.beforeEach('beforeEach1', () => { hasRun.push('beforeEach1') })
    subSuite.afterEach('afterEach1', () => { hasRun.push('afterEach1') })

    subSuite.addTest('test1', () => { hasRun.push('test1') })
    subSuite.addTest('test2', () => { hasRun.push('test2') })

    subSuite.before('before2', () => { hasRun.push('before2') })
    subSuite.after('after2', () => { hasRun.push('after2') })
    subSuite.beforeEach('beforeEach2', () => { hasRun.push('beforeEach2') })
    subSuite.afterEach('afterEach2', () => { hasRun.push('afterEach2') })

    subSuite.addSubSuite('internal', (internalSuite) => {
      internalSuite.before('internalBefore', () => { hasRun.push('internalBefore') })
      internalSuite.after('internalAfter', () => { hasRun.push('internalAfter') })
      internalSuite.beforeEach('internalBeforeEach', () => { hasRun.push('internalBeforeEach') })
      internalSuite.afterEach('internalAfterEach', () => { hasRun.push('internalAfterEach') })

      internalSuite.addTest('internalTest1', () => { hasRun.push('internalTest1') })
      internalSuite.addTest('internalTest2', () => { hasRun.push('internalTest2') })
    })
  })
  return mySuite.run()
}
