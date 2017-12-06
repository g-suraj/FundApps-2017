let assert = require('assert')
let acceptibleDirections = ['N', 'S', 'E', 'W']
let acceptibleCommands = ['F', 'B', 'L', 'R']
let Rover = class {
  // We assume the grid is 100 x 100?
  constructor (x, y, compass) {
    assert(typeof x === 'number')
    assert(typeof y === 'number')
    assert(typeof compass === 'string')
    assert(x !== undefined && x >= 0 && x < 100)
    assert(y !== undefined && y >= 0 && y < 100)
    assert(compass !== undefined && compass.length === 1)
    assert(acceptibleDirections.indexOf(compass) !== -1)
    this.x = x
    this.y = y
    this.compass = compass
  }

  command (instructions) {
    assert(typeof instructions === 'string')
    for (var i = 0; i < instructions.length; i++) {
      assert(acceptibleCommands.indexOf(instructions[i]) !== -1)
    }
  }
}

module.exports = Rover
