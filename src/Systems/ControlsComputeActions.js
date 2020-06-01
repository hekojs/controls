import Heko from '@hekojs/core'
import HekoPhysics from '@hekojs/2d-physics'
import HekoHelpers from '@hekojs/helpers'
import TopDownRotateThrustControl from '../Components/TopDownRotateThrustControl'

export default class ControlsComputeActions extends Heko.System {
  static queries = {
    withTopDownRotateThrustControl: { components: [HekoPhysics.Components.Physics, TopDownRotateThrustControl] }
  }

  onTick () {
    this.handleWithTopDownRotateThrustControl(this.queries.withTopDownRotateThrustControl.results)
  }

  handleWithTopDownRotateThrustControl (entities) {
    entities.forEach(entity => {
      const control = entity.getComponent(TopDownRotateThrustControl)
      const physics = entity.getComponent(HekoPhysics.Components.Physics)

      if (control.actions.forward) {
        physics.applyForce({
          x: Math.cos(HekoHelpers.Angle.toRadian(physics.angle) - HekoHelpers.Angle.toRadian(90)) * 0.0002,
          y: Math.sin(HekoHelpers.Angle.toRadian(physics.angle) - HekoHelpers.Angle.toRadian(90)) * 0.0002
        })
      }
      if (control.actions.brake) {
        physics.applyForce({
          x: physics.velocity.x / 10000 * -1,
          y: physics.velocity.y / 10000 * -1,
        })
      }
      if (control.actions.right) {
        physics.setAngle({ angle: physics.angle + 2 })
      }
      if (control.actions.left) {
        physics.setAngle({ angle: physics.angle - 2 })
      }
    })
  }
}