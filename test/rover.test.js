let Rover = require('../rover')
let assert = require('assert')
describe('Rover Instance', () => {
  it('basic sanity check', () => {
    let rover = new Rover(1, 2, 'N')
    assert(rover.x === 1)
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

describe('Rover command', () => {
  const rover = new Rover(0, 0, 'N')
  describe('Should be a valid command', () => {
    it('Command string should be a string', () => {
      assert.throws(() => {
        rover.command(11111)
      }, Error)
    })

    it('Command string should be a valid string', () => {
      assert.throws(() => {
        rover.command('This is not a valid string')
      }, Error)
    })
  })
  describe('Should be a perform forward and backwards commands', () => {
    it('with any forward command', () => {
      rover.command('FF')
      assert(rover.y === 2)
      rover.command('F')
      assert(rover.y === 3)
      rover.command('')
      assert(rover.y === 3)
    })
    it('with any backwards command', () => {
      rover.command('B')
      assert(rover.y === 1)
      rover.command('BB')
      assert(rover.y === 0)
      rover.command('')
      assert(rover.y === 3)
    })
    it('with any forwards and backwards command', () => {
    })
  })
})
