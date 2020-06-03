import Heko from '@hekojs/core'
import HekoPhysics from '@hekojs/2d-physics'
import HekoHelpers from '@hekojs/helpers'
import TopDownRotateThrustControl from '../Components/TopDownRotateThrustControl'
import SideWalkJumpControl from '../Components/SideWalkJumpControl'

export default class ControlsComputeActions extends Heko.System {
  static queries = {
    withTopDownRotateThrustControl: { components: [HekoPhysics.Components.Physics, TopDownRotateThrustControl] },
    withSideWalkJumpControl: { components: [HekoPhysics.Components.Physics, SideWalkJumpControl] }
  }

  onTick () {
    this.handleWithTopDownRotateThrustControl(this.queries.withTopDownRotateThrustControl.results)
    this.handleWithSideWalkJumpControl(this.queries.withSideWalkJumpControl.results)
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

  handleWithSideWalkJumpControl (entities) {
    entities.forEach(entity => {
      const control = entity.getComponent(SideWalkJumpControl)
      const physics = entity.getComponent(HekoPhysics.Components.Physics)

      // TODO
      if (control.actions.up) {

      }

      if (control.actions.down) {

      }

      if (control.actions.right) {
        physics.applyForce({ x: 0.0002, y: 0 })
      }

      if (control.actions.left) {
        physics.applyForce({ x: - 0.0002, y: 0 })
      }

      if (control.actions.jump) {
        if(Math.abs(physics.velocity.y) < 0.8) {
          physics.applyForce({ x: 0, y: - 0.008 })
        }
        control.actions.jump = false
      }
    })
  }
}