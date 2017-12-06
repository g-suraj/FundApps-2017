let assert = require('assert')
let acceptibleDirections = ['N', 'E', 'S', 'W']
let numAcceptibleDirections = acceptibleDirections.length
let acceptibleCommands = ['F', 'B', 'L', 'R']
let obstacles = []

// We assume the grid is 100 x 100?
let gridX = 100
let gridY = 100
// Just a helper function to add obstacles to the grid.
// Not related to rover's knowledge of obstacles
let addObstacle = function (x, y) {
  obstacles.push([x, y])
}

let Rover = class {
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
    // The rover logs all obstacles detected
    this.obstaclesLogged = []
  }

  command (instructions) {
    let currentDirectionIndex
    assert(typeof instructions === 'string')
    for (var i = 0; i < instructions.length; i++) {
      let instruction = instructions[i]
      assert(acceptibleCommands.indexOf(instruction) !== -1)
      switch (instruction) {
        case 'F':
          this.processForwardBackward(instruction, true)
          break
        case 'B':
          this.processForwardBackward(instruction, false)
          break
        case 'R':
          currentDirectionIndex = acceptibleDirections.indexOf(this.compass)
          this.compass = acceptibleDirections[(currentDirectionIndex + 1) % numAcceptibleDirections]
          break
        case 'L':
          currentDirectionIndex = acceptibleDirections.indexOf(this.compass)
          let newIndex = (((currentDirectionIndex - 1) % numAcceptibleDirections) + numAcceptibleDirections) % numAcceptibleDirections
          this.compass = acceptibleDirections[newIndex]
          break
        default:
          throw Error('Error incorrect input instruction')
      }
    }
  }

  processForwardBackward (instruction, isForward) {
    let unit = 1
    let yUnit = 0
    let xUnit = 0
    if (!isForward) {
      unit *= -1
    }
    switch (this.compass) {
      case 'N':
        yUnit += unit
        break
      case 'S':
        yUnit -= unit
        break
      case 'E':
        xUnit += unit
        break
      case 'W':
        xUnit -= unit
        break
      default:
    }
    // Handle obstacle
    let potentialX = (((this.x + xUnit) % gridX) + gridX) % gridX
    let potentialY = (((this.y + yUnit) % gridY) + gridY) % gridY
    let potentialObstacle = [potentialX, potentialY]
    for (var i = 0; i < obstacles.length; i++) {
      if (obstacles[i].toString() === potentialObstacle.toString()) {
        this.obstaclesLogged.push(potentialObstacle)
        return
      }
    }
    this.x = potentialX
    this.y = potentialY
  }
}

module.exports.Rover = Rover
module.exports.addObstacle = addObstacle
