import { Suite } from '../../lib/suite'

export const hasRun: Array<string> = []

export const expectedRun = [
  'test2',

  'internal-not-only-with-only-test-test-2',

  'internal-only-test-1',
  'internal-only-test-2',
  'internal-only-internal-test-1',
  'internal-only-internal-test-2'
]

export const run = () => {
  const mySuite = new Suite()

  mySuite.addTest('test1', () => { hasRun.push('test1') })
  mySuite.addTest('test2', () => { hasRun.push('test2') }, { only: true })

  mySuite.addSubSuite('internal-not-only', (internalSuite) => {
    internalSuite.addTest('internal-not-only-test-1', () => { hasRun.push('internal-not-only-test-1') })
    internalSuite.addTest('internal-not-only-test-2', () => { hasRun.push('internal-not-only-test-2') })
  })

  mySuite.addSubSuite('internal-not-only-with-only-test', (internalSuite) => {
    internalSuite.addTest('internal-not-only-with-only-test-test-1', () => { hasRun.push('internal-not-only-with-only-test-test-1') })
    internalSuite.addTest('internal-not-only-with-only-test-test-2', () => { hasRun.push('internal-not-only-with-only-test-test-2') }, { only: true })
  })

  mySuite.addSubSuite('internal-only', (internalSuite) => {
    internalSuite.addTest('internal-only-test-1', () => { hasRun.push('internal-only-test-1') })
    internalSuite.addTest('internal-only-test-2', () => { hasRun.push('internal-only-test-2') })
    internalSuite.addSubSuite('internal-only-internal', (internalSubSuite) => {
      internalSubSuite.addTest('internal-only-internal-test-1', () => { hasRun.push('internal-only-internal-test-1') })
      internalSubSuite.addTest('internal-only-internal-test-2', () => { hasRun.push('internal-only-internal-test-2') })
    })
  }, { only: true })
  return mySuite.run()
}
