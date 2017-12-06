let Rover = require('../rover')
let assert = require('assert')
describe('Rover Instance', () => {
  it('Should not have any undefined members', () => {
    assert.throws(() => {
      let rover = new Rover()
    }, Error)
  })
  it('Should not have any partially undefined members', () => {
    assert.throws(() => {
      let rover = new Rover(1, 4)
    }, Error)
    assert.throws(() => {
      let rover = new Rover(4)
    }, Error)
  })
  describe('after successful instantiation', () => {
    it('Should not have any directional members ill defined', () => {
      assert.throws(() => {
        let rover = new Rover(101, 4, 'N')
      }, Error)
      assert.throws(() => {
        let rover = new Rover(-1, 4, 'N')
      }, Error)
      assert.throws(() => {
        let rover = new Rover(10, 400, 'N')
      }, Error)
      assert.throws(() => {
        let rover = new Rover(10, 10400, 'N')
      }, Error)
      assert.throws(() => {
        let rover = new Rover('nope', 10400, 'N')
      }, Error)
      assert.throws(() => {
        let rover = new Rover(1, 'something', 'N')
      }, Error)
      assert.throws(() => {
        let rover = new Rover('something', 1, 'N')
      }, Error)
      assert.throws(() => {
        let rover = new Rover('something', 'something', 'N')
      }, Error)
    })
    it('Should not have any compass members ill defined', () => {
      assert.throws(() => {
        let rover = new Rover(1, 1, 0)
      }, Error)
    })
  })
})
