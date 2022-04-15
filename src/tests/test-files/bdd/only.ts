import { describe, it, resetGlobalSuite } from '../../../lib/bdd'
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
  const suite = resetGlobalSuite()

  describe('test-only', () => {
    it('test1', () => { hasRun.push('test1') })
    it.only('test2', () => { hasRun.push('test2') })

    describe('internal-not-only', () => {
      it('internal-not-only-test-1', () => { hasRun.push('internal-not-only-test-1') })
      it('internal-not-only-test-2', () => { hasRun.push('internal-not-only-test-2') })
    })

    describe('internal-not-only-with-only-test', () => {
      it('internal-not-only-with-only-test-test-1', () => { hasRun.push('internal-not-only-with-only-test-test-1') })
      it.only('internal-not-only-with-only-test-test-2', () => { hasRun.push('internal-not-only-with-only-test-test-2') })
    })

    describe.only('internal-only', () => {
      it('internal-only-test-1', () => { hasRun.push('internal-only-test-1') })
      it('internal-only-test-2', () => { hasRun.push('internal-only-test-2') })
      describe('internal-only-internal', () => {
        it('internal-only-internal-test-1', () => { hasRun.push('internal-only-internal-test-1') })
        it('internal-only-internal-test-2', () => { hasRun.push('internal-only-internal-test-2') })
      })
    })
  })

  return suite.run()
}
