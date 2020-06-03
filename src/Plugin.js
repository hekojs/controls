import ControlsComputeActions from './Systems/ControlsComputeActions'

export default class Controls {
  constructor (world) {
    this.world = world
  }

  onStart() {
    this.world.systems.add(ControlsComputeActions)
  }
}