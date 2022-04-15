import { Suite } from '../../../lib/suite'
import { ComparableSuiteResult } from '../../test-utils.spec'

export const hasRun: Array<string> = []

export const expectedRun = [
  'before',

  'beforeEach',
  'test1',
  'afterEach',

  // Skipped
  // 'beforeEach',
  // 'test2',
  // 'afterEach',

  'beforeEach',
  'test3',
  'afterEach',

  'beforeEach',
  'internalTest1',
  'afterEach',

  // Skipped
  // 'beforeEach',
  // 'internalTest2',
  // 'afterEach',

  'after'
]

export const expectedResult: ComparableSuiteResult = {
  name: '',
  success: true,
  skipped: false,
  nPassing: 3,
  nFailed: 0,
  tests: [],
  subSuites: [
    {
      name: 'test-skip',
      success: true,
      skipped: false,
      nPassing: 3,
      nFailed: 0,
      tests: [
        { name: 'test1', skipped: false, error: null },
        { name: 'test2', skipped: true, error: null },
        { name: 'test3', skipped: false, error: null }
      ],
      subSuites: [
        {
          name: 'internal',
          success: true,
          skipped: false,
          nPassing: 1,
          nFailed: 0,
          tests: [
            { name: 'internalTest1', skipped: false, error: null },
            { name: 'internalTest2', skipped: true, error: null }
          ],
          subSuites: []
        },
        {
          name: 'internal-skipped',
          success: true,
          skipped: true,
          nPassing: 0,
          nFailed: 0,
          tests: [],
          subSuites: []
        }
      ]
    }
  ]
}

export const run = () => {
  const mySuite = new Suite()

  mySuite.addSubSuite('test-skip', (subSuite) => {
    subSuite.before('before', () => { hasRun.push('before') })
    subSuite.after('after', () => { hasRun.push('after') })
    subSuite.beforeEach('beforeEach', () => { hasRun.push('beforeEach') })
    subSuite.afterEach('afterEach', () => { hasRun.push('afterEach') })

    subSuite.addTest('test1', () => { hasRun.push('test1') })
    subSuite.addTest('test2', () => { hasRun.push('test2') }, { skipped: true })
    subSuite.addTest('test3', () => { hasRun.push('test3') })

    subSuite.addSubSuite('internal', (internalSuite) => {
      internalSuite.addTest('internalTest1', () => { hasRun.push('internalTest1') })
      internalSuite.addTest('internalTest2', () => { hasRun.push('internalTest2') }, { skipped: true })
    })

    subSuite.addSubSuite('internal-skipped', (internalSuite) => {
      internalSuite.addTest('internalSkippedTest1', () => { hasRun.push('internalSkippedTest1') })
      internalSuite.addTest('internalSkippedTest2', () => { hasRun.push('internalSkippedTest2') })
    }, { skipped: true })
  })
  return mySuite.run()
}
