let assert = require('assert')
let acceptibleDirections = ['N', 'E', 'S', 'W']
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
      let instruction = instructions[i]
      assert(acceptibleCommands.indexOf(instruction) !== -1)
      switch (instruction) {
        case 'F':
          ++this.y
          break
        case 'B':
          --this.y
          break
        case 'R':
          ++this.y
          break
        case 'L':
          --this.y
          break
        default:
          throw Error('Error incorrect input instruction')
      }
    }
  }
}

module.exports = Rover
