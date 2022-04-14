import { describe, it, before, after, beforeEach, afterEach, resetGlobalSuite } from '../../../lib/bdd'
import { wait } from '../../test-utils.spec'

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

  'beforeEach1',
  'beforeEach2',
  'test3',
  'afterEach1',
  'afterEach2',

  'beforeEach1',
  'beforeEach2',
  'internalTest1',
  'afterEach1',
  'afterEach2',

  'after1',
  'after2'
]

export const run = () => {
  const suite = resetGlobalSuite()

  describe('test-bdd-async', () => {
    before('before1', async () => {
      await wait(10)
      hasRun.push('before1')
    })
    after('after1', async () => {
      await wait(10)
      hasRun.push('after1')
    })
    beforeEach('beforeEach1', async () => {
      await wait(10)
      hasRun.push('beforeEach1')
    })
    afterEach('afterEach1', async () => {
      await wait(10)
      hasRun.push('afterEach1')
    })

    it('test1', () => { hasRun.push('test1') })
    it('test2', async () => {
      await wait(5)
      hasRun.push('test2')
    })
    it('test3', async () => {
      await wait(5)
      hasRun.push('test3')
      throw new Error('test3')
    })

    before('before2', async () => {
      await wait(5) // This is less than the wait in before1, to make sure before1 is finished before we start before2
      hasRun.push('before2')
    })
    after('after2', async () => {
      await wait(5)
      hasRun.push('after2')
    })
    beforeEach('beforeEach2', async () => {
      await wait(5)
      hasRun.push('beforeEach2')
    })
    afterEach('afterEach2', async () => {
      await wait(5)
      hasRun.push('afterEach2')
    })

    describe('internal', () => {
      it('internalTest1', async () => { hasRun.push('internalTest1') })
    })
  })

  return suite.run()
}
