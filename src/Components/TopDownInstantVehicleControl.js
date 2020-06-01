import HekoControls from '@hekojs/controls'

export default {
  bind (ticker, entity) {
    const controls = new HekoControls.Keyboard(ticker)

    controls.events.on('updated.arrows', ({up, right, down, left}) => {
      this._applyDirectionToEntity(entity, {up, right, down, left})
    })
  },

  _applyDirectionToEntity (entity, {up, right, down, left}) {
    if (up && right) {
      this._setEntityMoveToAngle(entity, 45)
    } else if (right && down) {
      this._setEntityMoveToAngle(entity, 135)
    } else if (down && left) {
      this._setEntityMoveToAngle(entity, 225)
    } else if (left && up) {
      this._setEntityMoveToAngle(entity, 315)
    } else if (up) {
      this._setEntityMoveToAngle(entity, 0)
    } else if (right) {
      this._setEntityMoveToAngle(entity, 90)
    } else if (down) {
      this._setEntityMoveToAngle(entity, 180)
    } else if (left) {
      this._setEntityMoveToAngle(entity, 270)
    } else {
      this._setEntityStopMoving(entity)
    }
  },

  _setEntityMoveToAngle (entity, angle) {
    entity.components.canMove.toAngle({ angle })
  },

  _setEntityStopMoving (entity) {
    entity.components.canMove.stop()
  }
}