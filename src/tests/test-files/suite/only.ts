import { Suite } from '../../../lib/suite'
import { ComparableSuiteResult } from '../../test-utils.spec'

export const hasRun: Array<string> = []

export const expectedRun = [
  'test2',

  'internal-not-only-with-only-test-test-2',

  'internal-only-test-1',
  'internal-only-test-2',
  'internal-only-internal-test-1',
  'internal-only-internal-test-2'
]

export const expectedResult: ComparableSuiteResult = {
  name: '',
  success: true,
  skipped: false,
  nPassing: 6,
  nFailed: 0,
  tests: [],
  subSuites: [
    {
      name: 'test-only',
      success: true,
      skipped: false,
      nPassing: 6,
      nFailed: 0,
      tests: [
        { name: 'test2', skipped: false, error: null }
      ],
      subSuites: [
        {
          name: 'internal-not-only-with-only-test',
          success: true,
          skipped: false,
          nPassing: 1,
          nFailed: 0,
          tests: [
            { name: 'internal-not-only-with-only-test-test-2', skipped: false, error: null }
          ],
          subSuites: []
        },
        {
          name: 'internal-only',
          success: true,
          skipped: false,
          nPassing: 4,
          nFailed: 0,
          tests: [
            { name: 'internal-only-test-1', skipped: false, error: null },
            { name: 'internal-only-test-2', skipped: false, error: null }
          ],
          subSuites: [
            {
              name: 'internal-only-internal',
              success: true,
              skipped: false,
              nPassing: 2,
              nFailed: 0,
              tests: [
                { name: 'internal-only-internal-test-1', skipped: false, error: null },
                { name: 'internal-only-internal-test-2', skipped: false, error: null }
              ],
              subSuites: []
            }
          ]
        }
      ]
    }
  ]
}

export const run = () => {
  const mySuite = new Suite()

  mySuite.addSubSuite('test-only', (subSuite) => {
    subSuite.addTest('test1', () => { hasRun.push('test1') })
    subSuite.addTest('test2', () => { hasRun.push('test2') }, { only: true })

    subSuite.addSubSuite('internal-not-only', (internalSuite) => {
      internalSuite.addTest('internal-not-only-test-1', () => { hasRun.push('internal-not-only-test-1') })
      internalSuite.addTest('internal-not-only-test-2', () => { hasRun.push('internal-not-only-test-2') })
    })

    subSuite.addSubSuite('internal-not-only-with-only-test', (internalSuite) => {
      internalSuite.addTest('internal-not-only-with-only-test-test-1', () => { hasRun.push('internal-not-only-with-only-test-test-1') })
      internalSuite.addTest('internal-not-only-with-only-test-test-2', () => { hasRun.push('internal-not-only-with-only-test-test-2') }, { only: true })
    })

    subSuite.addSubSuite('internal-only', (internalSuite) => {
      internalSuite.addTest('internal-only-test-1', () => { hasRun.push('internal-only-test-1') })
      internalSuite.addTest('internal-only-test-2', () => { hasRun.push('internal-only-test-2') })
      internalSuite.addSubSuite('internal-only-internal', (internalSubSuite) => {
        internalSubSuite.addTest('internal-only-internal-test-1', () => { hasRun.push('internal-only-internal-test-1') })
        internalSubSuite.addTest('internal-only-internal-test-2', () => { hasRun.push('internal-only-internal-test-2') })
      })
    }, { only: true })
  })
  return mySuite.run()
}
