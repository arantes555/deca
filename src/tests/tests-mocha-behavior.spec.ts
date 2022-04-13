import { describe, it } from 'mocha'

describe('test-mocha-behaviour', function () {
  it.only('test root1', function () {
    console.log('test root1')
  })
  it.only('test root2', function () {
    console.log('test root2')
  })
  describe('sub-describe 1', function () {
    it('test1 sub1', function () {
      console.log('test1 sub1')
    })
    it('test2 sub1', function () {
      console.log('test2 sub1')
    })
    describe('sub-sub-describe 1', function () {
      it('test1 sub-sub1', function () {
        console.log('test1 sub-sub1')
      })
      it('test2 sub-sub1', function () {
        console.log('test2 sub-sub1')
      })
    })
  })
  describe.only('sub-describe 2', function () {
    it.only('test1 sub2', function () {
      console.log('test1 sub2')
    })
    it('test2 sub2', function () {
      console.log('test2 sub2')
    })
    describe('sub-sub-describe 2', function () {
      it('test1 sub-sub2', function () {
        console.log('test1 sub-sub2')
      })
      it('test2 sub-sub2', function () {
        console.log('test2 sub-sub2')
      })
    })
  })
})
