import { Suite } from '../../lib/suite'

export const hasRun: Array<string> = []

export const expectedRun = [
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
  'after2'
]

export const run = () => {
  const mySuite = new Suite()

  mySuite.before('before1', () => { hasRun.push('before1') })
  mySuite.after('after1', () => { hasRun.push('after1') })
  mySuite.beforeEach('beforeEach1', () => { hasRun.push('beforeEach1') })
  mySuite.afterEach('afterEach1', () => { hasRun.push('afterEach1') })

  mySuite.addTest('test1', () => { hasRun.push('test1') })
  mySuite.addTest('test2', () => { hasRun.push('test2') })

  mySuite.before('before2', () => { hasRun.push('before2') })
  mySuite.after('after2', () => { hasRun.push('after2') })
  mySuite.beforeEach('beforeEach2', () => { hasRun.push('beforeEach2') })
  mySuite.afterEach('afterEach2', () => { hasRun.push('afterEach2') })

  mySuite.addSubSuite('internal', (internalSuite) => {
    internalSuite.before('internalBefore', () => { hasRun.push('internalBefore') })
    internalSuite.after('internalAfter', () => { hasRun.push('internalAfter') })
    internalSuite.beforeEach('internalBeforeEach', () => { hasRun.push('internalBeforeEach') })
    internalSuite.afterEach('internalAfterEach', () => { hasRun.push('internalAfterEach') })

    internalSuite.addTest('internalTest1', () => { hasRun.push('internalTest1') })
    internalSuite.addTest('internalTest2', () => { hasRun.push('internalTest2') })
  })
  return mySuite.run()
}
