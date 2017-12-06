let Rover = require('../rover')
let assert = require('assert')
describe('Rover Instance', function () {
  it('Should not have any undefined members', function () {
    assert.throws(() => {
      let rover = new Rover()
    }, Error)
  })
  it('Should not have any partially undefined members', function () {
    assert.throws(() => {
      let rover = new Rover(1, 4)
    }, Error)
  })
})
