import { Suite } from '../lib/suite'
import assert from 'assert'

describe('deca', function () {
  describe('raw Suite', function () {
    it('test sub1', async function () {
      const mySuite = new Suite()
      mySuite.addTest('test1', () => console.log('test1'))
      mySuite.addTest('test2', () => { throw new Error('TEST2') }, { skipped: true })
      mySuite.addTest('test3', () => console.log('test3'))
      mySuite.addSubSuite('internal', (internalSuite) => {
        internalSuite.addTest('internalTest1', () => console.log('internalTest1'))
        internalSuite.addTest('internalTest2', () => { throw new Error('INTERNAL TEST2') })
        internalSuite.addTest('internalTest3', () => console.log('internalTest3'))
      })
      const success = await mySuite.run()
      assert.strictEqual(success, false)
    })
  })
})
