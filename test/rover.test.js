let Rover = require('../rover').Rover
let addObstacle = require('../rover').addObstacle
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
      assert(rover.x === 0)
      assert(rover.compass === 'N')
    })
    it('with any backwards command', () => {
      rover.command('B')
      assert(rover.y === 2)
      rover.command('BB')
      assert(rover.y === 0)
      rover.command('')
      assert(rover.y === 0)
      assert(rover.x === 0)
      assert(rover.compass === 'N')
    })
    it('with any forwards and backwards command', () => {
      rover.command('FFBBFFBFF')
      assert(rover.y === 3)
      assert(rover.x === 0)
      assert(rover.compass === 'N')
      rover.command('BBB')
      assert(rover.y === 0)
      assert(rover.x === 0)
      assert(rover.compass === 'N')
    })
  })
  describe('Should be a perform left and right commands', () => {
    it('with any left command', () => {
      rover.command('L')
      assert(rover.y === 0 && rover.x === 0)
      assert(rover.compass === 'W')
      rover.command('LL')
      assert(rover.y === 0 && rover.x === 0)
      assert(rover.compass === 'E')
      rover.command('L')
      assert(rover.y === 0 && rover.x === 0)
      assert(rover.compass === 'N')
      rover.command('LLLL')
      assert(rover.y === 0 && rover.x === 0)
      assert(rover.compass === 'N')
    })
    it('with any right command', () => {
      rover.command('RR')
      assert(rover.y === 0 && rover.x === 0)
      assert(rover.compass === 'S')
      rover.command('R')
      assert(rover.y === 0 && rover.x === 0)
      assert(rover.compass === 'W')
      rover.command('R')
      assert(rover.y === 0 && rover.x === 0)
      assert(rover.compass === 'N')
      rover.command('RRRR')
      assert(rover.y === 0 && rover.x === 0)
      assert(rover.compass === 'N')
      rover.command('')
      assert(rover.y === 0 && rover.x === 0)
      assert(rover.compass === 'N')
    })
    it('with any left & right command', () => {
      rover.command('RRL')
      assert(rover.y === 0 && rover.x === 0)
      assert(rover.compass === 'E')
      rover.command('RRRRLLLLRRRRLLLLRRR')
      assert(rover.y === 0 && rover.x === 0)
      assert(rover.compass === 'N')
      rover.command('RLRLRLRL')
      assert(rover.y === 0 && rover.x === 0)
      assert(rover.compass === 'N')
    })
  })
  describe('Should be a perform all 4 commands', () => {
    it('without any overflow', () => {
      let rover = new Rover(0, 0, 'N')
      rover.command('FFRFF')
      assert(rover.x === 2 && rover.y === 2 && rover.compass === 'E')
    })
    it('with overflow', () => {
      let rover = new Rover(90, 0, 'N')
      rover.command('BRFFFFFFFFFFL')
      assert(rover.x === 0 && rover.y === 99 && rover.compass === 'N')
    })
  })
})
describe('Rover obstacle detection', () => {
  it('should detect an obstacle', () => {
    let rover = new Rover(0, 0, 'E')
    addObstacle(1, 1)
    rover.command('FLF')
    assert(rover.x === 1 && rover.y === 0 && rover.compass === 'N')
  })
  it('should detect an obstacle try 2', () => {
    let rover = new Rover(99, 0, 'E')
    addObstacle(0, 0)
    rover.command('F')
    assert(rover.x === 99 && rover.y === 0 && rover.compass === 'E')
  })
})
