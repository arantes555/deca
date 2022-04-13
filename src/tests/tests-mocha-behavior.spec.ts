import { describe, it, beforeEach, afterEach } from 'mocha'

describe.skip('test-mocha-behaviour', function () {
  beforeEach(function () {
    console.log('Root beforeEach')
  })
  afterEach(function () {
    console.log('Root afterEach')
  })
  beforeEach(function () {
    console.log('Root beforeEach2')
  })
  afterEach(function () {
    console.log('Root afterEach2')
  })
  it('test root', function () {
    console.log('test root')
  })
  describe('sub-describe', function () {
    beforeEach(function () {
      console.log('sub beforeEach')
    })
    afterEach(function () {
      console.log('sub afterEach')
    })
    it('test sub1', function () {
      console.log('test sub1')
    })
    it('test sub2', function () {
      console.log('test sub2')
      throw new Error('TESTERROR2')
    })
  })
})
