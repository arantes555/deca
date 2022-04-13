import { describe, it, resetGlobalSuite } from '../../lib/bdd'

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
  const suite = resetGlobalSuite()

  describe('test-bdd-skip', () => {
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
