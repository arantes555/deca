import { describe, it, before, after, beforeEach, afterEach, resetGlobalSuite } from '../../../lib/bdd'

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
    before('before1', (done) => {
      hasRun.push('before1')
      setTimeout(() => done(), 10)
    })
    after('after1', (done) => {
      hasRun.push('after1')
      setTimeout(() => done(), 10)
    })
    beforeEach('beforeEach1', (done) => {
      hasRun.push('beforeEach1')
      setTimeout(() => done(), 10)
    })
    afterEach('afterEach1', (done) => {
      hasRun.push('afterEach1')
      setTimeout(() => done(), 10)
    })

    it('test1', () => { hasRun.push('test1') })
    it('test2', (done) => {
      hasRun.push('test2')
      setTimeout(() => done(), 5)
    })
    it('test3', (done) => {
      hasRun.push('test3')
      setTimeout(() => done(new Error('test3')), 5)
    })

    before('before2', (done) => {
      hasRun.push('before2')
      setTimeout(() => done(), 5) // This is less than the wait in before1, to make sure before1 is finished before we start before2
    })
    after('after2', (done) => {
      hasRun.push('after2')
      setTimeout(() => done(), 5)
    })
    beforeEach('beforeEach2', (done) => {
      hasRun.push('beforeEach2')
      setTimeout(() => done(), 5)
    })
    afterEach('afterEach2', (done) => {
      hasRun.push('afterEach2')
      setTimeout(() => done(), 5)
    })

    describe('internal', () => {
      it('internalTest1', (done) => {
        hasRun.push('internalTest1')
        done()
      })
    })
  })

  return suite.run()
}
