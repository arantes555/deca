import { describe, it, before, after, beforeEach, afterEach, resetGlobalSuite } from '../../lib/bdd'

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
  const suite = resetGlobalSuite()

  describe('test-bdd-error', () => {
    it('test1', () => { hasRun.push('test1') })
    it('test2', () => { throw new Error('test2') })
    it('test3', () => { hasRun.push('test3') })

    describe('internal-with-error-in-test', () => {
      before('internal-with-error-in-test-before', () => { hasRun.push('internal-with-error-in-test-before') })
      after('internal-with-error-in-test-after', () => { hasRun.push('internal-with-error-in-test-after') })

      it('internal-with-error-in-test-test1', () => { hasRun.push('internal-with-error-in-test-test1') })
      it('internal-with-error-in-test-test2', () => { throw new Error('internal-with-error-in-test-test2') })
      it('internal-with-error-in-test-test3', () => { hasRun.push('internal-with-error-in-test-test3') })
    })

    describe('internal-with-error-in-before', () => {
      before('internal-with-error-in-before-before', () => { throw new Error('internal-with-error-in-before-before') })
      after('internal-with-error-in-before-after', () => { hasRun.push('internal-with-error-in-before-after') })

      it('internal-with-error-in-before-test1', () => { hasRun.push('internal-with-error-in-before-test1') })
    })

    describe('internal-with-error-in-second-beforeEach', () => {
      before('internal-with-error-in-second-beforeEach-before', () => { hasRun.push('internal-with-error-in-second-beforeEach-before') })
      after('internal-with-error-in-second-beforeEach-after', () => { hasRun.push('internal-with-error-in-second-beforeEach-after') })
      let beforeEachRun = 0
      beforeEach('internal-with-error-in-second-beforeEach-beforeEach', () => {
        beforeEachRun++
        if (beforeEachRun === 2) throw new Error('internal-with-error-in-second-beforeEach-beforeEach')
        else hasRun.push('internal-with-error-in-second-beforeEach-beforeEach')
      })
      afterEach('internal-with-error-in-second-beforeEach-afterEach', () => { hasRun.push('internal-with-error-in-second-beforeEach-afterEach') })

      it('internal-with-error-in-second-beforeEach-test1', () => { hasRun.push('internal-with-error-in-second-beforeEach-test1') })
      it('internal-with-error-in-second-beforeEach-test2', () => { hasRun.push('internal-with-error-in-second-beforeEach-test2') })
      it('internal-with-error-in-second-beforeEach-test3', () => { hasRun.push('internal-with-error-in-second-beforeEach-test3') })
    })
  })

  return suite.run()
}
