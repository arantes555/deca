import { Suite } from '../../lib/suite'

export const hasRun: Array<string> = []

export const expectedRun = [
  'test1',
  'test3',

  'internal-with-error-in-test-before',
  'internal-with-error-in-test-test1',
  'internal-with-error-in-test-test3',
  'internal-with-error-in-test-after',

  'internal-with-error-in-second-beforeEach-before',
  'internal-with-error-in-second-beforeEach-beforeEach',
  'internal-with-error-in-second-beforeEach-test1',
  'internal-with-error-in-second-beforeEach-afterEach'
]

export const run = () => {
  const mySuite = new Suite()

  mySuite.addTest('test1', () => { hasRun.push('test1') })
  mySuite.addTest('test2', () => { throw new Error('test2') })
  mySuite.addTest('test3', () => { hasRun.push('test3') })

  mySuite.addSubSuite('internal-with-error-in-test', (internalSuite) => {
    internalSuite.before('internal-with-error-in-test-before', () => { hasRun.push('internal-with-error-in-test-before') })
    internalSuite.after('internal-with-error-in-test-after', () => { hasRun.push('internal-with-error-in-test-after') })

    internalSuite.addTest('internal-with-error-in-test-test1', () => { hasRun.push('internal-with-error-in-test-test1') })
    internalSuite.addTest('internal-with-error-in-test-test2', () => { throw new Error('internal-with-error-in-test-test2') })
    internalSuite.addTest('internal-with-error-in-test-test3', () => { hasRun.push('internal-with-error-in-test-test3') })
  })

  mySuite.addSubSuite('internal-with-error-in-before', (internalSuite) => {
    internalSuite.before('internal-with-error-in-before-before', () => { throw new Error('internal-with-error-in-before-before') })
    internalSuite.after('internal-with-error-in-before-after', () => { hasRun.push('internal-with-error-in-before-after') })

    internalSuite.addTest('internal-with-error-in-before-test1', () => { hasRun.push('internal-with-error-in-before-test1') })
  })

  mySuite.addSubSuite('internal-with-error-in-second-beforeEach', (internalSuite) => {
    internalSuite.before('internal-with-error-in-second-beforeEach-before', () => { hasRun.push('internal-with-error-in-second-beforeEach-before') })
    internalSuite.after('internal-with-error-in-second-beforeEach-after', () => { hasRun.push('internal-with-error-in-second-beforeEach-after') })
    let beforeEachRun = 0
    internalSuite.beforeEach('internal-with-error-in-second-beforeEach-beforeEach', () => {
      beforeEachRun++
      if (beforeEachRun === 2) throw new Error('internal-with-error-in-second-beforeEach-beforeEach')
      else hasRun.push('internal-with-error-in-second-beforeEach-beforeEach')
    })
    internalSuite.afterEach('internal-with-error-in-second-beforeEach-afterEach', () => { hasRun.push('internal-with-error-in-second-beforeEach-afterEach') })

    internalSuite.addTest('internal-with-error-in-second-beforeEach-test1', () => { hasRun.push('internal-with-error-in-second-beforeEach-test1') })
    internalSuite.addTest('internal-with-error-in-second-beforeEach-test2', () => { hasRun.push('internal-with-error-in-second-beforeEach-test2') })
    internalSuite.addTest('internal-with-error-in-second-beforeEach-test3', () => { hasRun.push('internal-with-error-in-second-beforeEach-test3') })
  })

  return mySuite.run()
}
