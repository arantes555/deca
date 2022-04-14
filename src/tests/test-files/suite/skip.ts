import { Suite } from '../../../lib/suite'

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
  'internalTest1',
  'afterEach',

  // Skipped
  // 'beforeEach',
  // 'internalTest2',
  // 'afterEach',

  'after'
]

export const run = () => {
  const mySuite = new Suite()

  mySuite.before('before', () => { hasRun.push('before') })
  mySuite.after('after', () => { hasRun.push('after') })
  mySuite.beforeEach('beforeEach', () => { hasRun.push('beforeEach') })
  mySuite.afterEach('afterEach', () => { hasRun.push('afterEach') })

  mySuite.addTest('test1', () => { hasRun.push('test1') })
  mySuite.addTest('test2', () => { hasRun.push('test2') }, { skipped: true })

  mySuite.addSubSuite('internal', (internalSuite) => {
    internalSuite.addTest('internalTest1', () => { hasRun.push('internalTest1') })
    internalSuite.addTest('internalTest2', () => { hasRun.push('internalTest2') }, { skipped: true })
  })

  mySuite.addSubSuite('internal-skipped', (internalSuite) => {
    internalSuite.addTest('internalSkippedTest1', () => { hasRun.push('internalSkippedTest1') })
    internalSuite.addTest('internalSkippedTest2', () => { hasRun.push('internalSkippedTest2') })
  }, { skipped: true })
  return mySuite.run()
}
