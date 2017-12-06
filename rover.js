let assert = require('assert')
let Rover = class {
  constructor (x, y, compass) {
    assert(x !== undefined)
    assert(y !== undefined)
    assert(compass !== undefined)
    this.x = x
    this.y = y
    this.compass = compass
  }
}

module.exports = Rover
