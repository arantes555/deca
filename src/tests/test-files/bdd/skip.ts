import { describe, it, before, after, beforeEach, afterEach, resetGlobalSuite } from '../../../lib/bdd'
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
  skipped: false,
  tests: [],
  subSuites: [
    {
      name: 'test-skip',
      skipped: false,
      tests: [
        { name: 'test1', skipped: false, error: null },
        { name: 'test2', skipped: true, error: null },
        { name: 'test3', skipped: false, error: null }
      ],
      subSuites: [
        {
          name: 'internal',
          skipped: false,
          tests: [
            { name: 'internalTest1', skipped: false, error: null },
            { name: 'internalTest2', skipped: true, error: null }
          ],
          subSuites: []
        },
        {
          name: 'internal-skipped',
          skipped: true,
          tests: [],
          subSuites: []
        }
      ]
    }
  ]
}

export const run = () => {
  const suite = resetGlobalSuite()

  describe('test-skip', () => {
    before('before', () => { hasRun.push('before') })
    after('after', () => { hasRun.push('after') })
    beforeEach('beforeEach', () => { hasRun.push('beforeEach') })
    afterEach('afterEach', () => { hasRun.push('afterEach') })

    it('test1', () => { hasRun.push('test1') })
    it.skip('test2', () => { hasRun.push('test2') })
    it('test3', () => { hasRun.push('test3') })

    describe('internal', () => {
      it('internalTest1', () => { hasRun.push('internalTest1') })
      it.skip('internalTest2', () => { hasRun.push('internalTest2') })
    })

    describe.skip('internal-skipped', () => {
      it('internalSkippedTest1', () => { hasRun.push('internalSkippedTest1') })
      it('internalSkippedTest2', () => { hasRun.push('internalSkippedTest2') })
    })
  })

  return suite.run()
}
