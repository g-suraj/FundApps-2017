let Rover = require('../rover')
let assert = require('assert')
describe('Rover Instance', () => {
  it('basic sanity check', () => {
    let rover = new Rover(1, 2, 'N')
    assert(rover.x === 2)
    assert(rover.y === 2)
    assert(rover.compass === 'N')
  })
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
      assert.throws(() => {
        let rover = new Rover(1, 1, 'something')
      }, Error)
      assert.throws(() => {
        let rover = new Rover(1, 1, 'L')
      }, Error)
    })
  })
})

describe('Rover Command', () => {
  const rover = new Rover(0, 0, 'N')
  it('Command string should be a string', () => {
    assert.throws(() => {
      rover.command('Not A Valid String')
    }, Error)
  })
})
