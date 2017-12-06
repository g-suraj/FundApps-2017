let assert = require('assert')
let Rover = class {
  // We assume the grid is 100 x 100?
  constructor (x, y, compass) {
    assert(typeof x === 'number')
    assert(typeof y === 'number')
    assert(typeof y === 'string')
    assert(x !== undefined && x >= 0 && x < 100)
    assert(y !== undefined && y >= 0 && y < 100)
    assert(compass !== undefined)
    this.x = x
    this.y = y
    this.compass = compass
  }
}

module.exports = Rover
