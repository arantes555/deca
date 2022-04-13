import { describe, it } from 'mocha'
import { Suite } from '../lib'
import assert from 'assert'

describe('deca', function () {
  describe('raw Suite', function () {
    it('test sub1', async function () {
      const mySuite = new Suite()
      mySuite.it('test1', () => console.log('test1'))
      mySuite.it('test2', () => { throw new Error('TEST2') })
      mySuite.it('test3', () => console.log('test3'))
      mySuite.describe('internal', (internalSuite) => {
        internalSuite.it('internalTest1', () => console.log('internalTest1'))
        internalSuite.it('internalTest2', () => { throw new Error('INTERNAL TEST2') })
        internalSuite.it('internalTest3', () => console.log('internalTest3'))
      })
      const success = await mySuite.run()
      assert.strictEqual(success, false)
    })
  })
})
