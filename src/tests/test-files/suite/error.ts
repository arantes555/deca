import { Suite } from '../../../lib/suite'
import { ComparableSuiteResult } from '../../test-utils.spec'

export const hasRun: Array<string> = []

export const expectedRun = [
  'suite-with-error-in-test-before',
  'suite-with-error-in-test-test1',
  'suite-with-error-in-test-test3',
  'suite-with-error-in-test-subsuite-test',
  'suite-with-error-in-test-after',

  'suite-with-error-in-second-beforeEach-before',
  'suite-with-error-in-second-beforeEach-beforeEach',
  'suite-with-error-in-second-beforeEach-test1',
  'suite-with-error-in-second-beforeEach-afterEach'
]

export const expectedResult: ComparableSuiteResult = {
  name: '',
  success: false,
  skipped: false,
  nPassing: 4,
  nFailed: 1,
  tests: [],
  subSuites: [
    {
      name: 'suite-with-error-in-test',
      success: false,
      skipped: false,
      nPassing: 3,
      nFailed: 1,
      tests: [
        { name: 'suite-with-error-in-test-test1', skipped: false, error: null },
        { name: 'suite-with-error-in-test-test2', skipped: false, error: 'Error: suite-with-error-in-test-test2' },
        { name: 'suite-with-error-in-test-test3', skipped: false, error: null }
      ],
      subSuites: [
        {
          name: 'suite-with-error-in-test-subsuite',
          success: true,
          skipped: false,
          nPassing: 1,
          nFailed: 0,
          tests: [
            { name: 'suite-with-error-in-test-subsuite-test', skipped: false, error: null }
          ],
          subSuites: []
        }
      ]
    },
    {
      name: 'suite-with-error-in-before',
      success: false,
      skipped: false,
      nPassing: 0,
      nFailed: 0,
      tests: [],
      subSuites: []
    },
    {
      name: 'suite-with-error-in-second-beforeEach',
      success: false,
      skipped: false,
      nPassing: 1,
      nFailed: 0,
      tests: [
        { name: 'suite-with-error-in-second-beforeEach-test1', skipped: false, error: null }
      ],
      subSuites: []
    }
  ]
}

export const run = () => {
  const mySuite = new Suite()

  mySuite.addSubSuite('suite-with-error-in-test', (subSuite) => {
    subSuite.before('suite-with-error-in-test-before', () => { hasRun.push('suite-with-error-in-test-before') })
    subSuite.after('suite-with-error-in-test-after', () => { hasRun.push('suite-with-error-in-test-after') })

    subSuite.addTest('suite-with-error-in-test-test1', () => { hasRun.push('suite-with-error-in-test-test1') })
    subSuite.addTest('suite-with-error-in-test-test2', () => { throw new Error('suite-with-error-in-test-test2') })
    subSuite.addTest('suite-with-error-in-test-test3', () => { hasRun.push('suite-with-error-in-test-test3') })

    subSuite.addSubSuite('suite-with-error-in-test-subsuite', (subSubSuite) => {
      subSubSuite.addTest('suite-with-error-in-test-subsuite-test', () => { hasRun.push('suite-with-error-in-test-subsuite-test') })
    })
  })

  mySuite.addSubSuite('suite-with-error-in-before', (subSuite) => {
    subSuite.before('suite-with-error-in-before-before', () => { throw new Error('suite-with-error-in-before-before') })
    subSuite.after('suite-with-error-in-before-after', () => { hasRun.push('suite-with-error-in-before-after') })

    subSuite.addTest('suite-with-error-in-before-test1', () => { hasRun.push('suite-with-error-in-before-test1') })
  })

  mySuite.addSubSuite('suite-with-error-in-second-beforeEach', (subSuite) => {
    subSuite.before('suite-with-error-in-second-beforeEach-before', () => { hasRun.push('suite-with-error-in-second-beforeEach-before') })
    subSuite.after('suite-with-error-in-second-beforeEach-after', () => { hasRun.push('suite-with-error-in-second-beforeEach-after') })
    let beforeEachRun = 0
    subSuite.beforeEach('suite-with-error-in-second-beforeEach-beforeEach', () => {
      beforeEachRun++
      if (beforeEachRun === 2) throw new Error('suite-with-error-in-second-beforeEach-beforeEach')
      else hasRun.push('suite-with-error-in-second-beforeEach-beforeEach')
    })
    subSuite.afterEach('suite-with-error-in-second-beforeEach-afterEach', () => { hasRun.push('suite-with-error-in-second-beforeEach-afterEach') })

    subSuite.addTest('suite-with-error-in-second-beforeEach-test1', () => { hasRun.push('suite-with-error-in-second-beforeEach-test1') })
    subSuite.addTest('suite-with-error-in-second-beforeEach-test2', () => { hasRun.push('suite-with-error-in-second-beforeEach-test2') })
    subSuite.addTest('suite-with-error-in-second-beforeEach-test3', () => { hasRun.push('suite-with-error-in-second-beforeEach-test3') })
  })

  return mySuite.run()
}
