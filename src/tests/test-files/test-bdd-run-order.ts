import { describe, it, before, after, beforeEach, afterEach, resetGlobalSuite } from '../../lib/bdd'

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

export const run = () => {
  const suite = resetGlobalSuite()

  before('globalBefore', () => { hasRun.push('globalBefore') })
  after('globalAfter', () => { hasRun.push('globalAfter') })

  describe('test-bdd-run-order', () => {
    before('before1', () => { hasRun.push('before1') })
    after('after1', () => { hasRun.push('after1') })
    beforeEach('beforeEach1', () => { hasRun.push('beforeEach1') })
    afterEach('afterEach1', () => { hasRun.push('afterEach1') })

    it('test1', () => { hasRun.push('test1') })
    it('test2', () => { hasRun.push('test2') })

    before('before2', () => { hasRun.push('before2') })
    after('after2', () => { hasRun.push('after2') })
    beforeEach('beforeEach2', () => { hasRun.push('beforeEach2') })
    afterEach('afterEach2', () => { hasRun.push('afterEach2') })

    describe('internal', () => {
      before('internalBefore', () => { hasRun.push('internalBefore') })
      after('internalAfter', () => { hasRun.push('internalAfter') })
      beforeEach('internalBeforeEach', () => { hasRun.push('internalBeforeEach') })
      afterEach('internalAfterEach', () => { hasRun.push('internalAfterEach') })

      it('internalTest1', () => { hasRun.push('internalTest1') })
      it('internalTest2', () => { hasRun.push('internalTest2') })
    })
  })

  return suite.run()
}
