import { describe, it, before, after, beforeEach, afterEach, resetGlobalSuite } from '../../lib/bdd'

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
  const suite = resetGlobalSuite()

  describe('test-bdd-skip', () => {
    before('before', () => { hasRun.push('before') })
    after('after', () => { hasRun.push('after') })
    beforeEach('beforeEach', () => { hasRun.push('beforeEach') })
    afterEach('afterEach', () => { hasRun.push('afterEach') })

    it('test1', () => { hasRun.push('test1') })
    it.skip('test2', () => { hasRun.push('test2') })

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
