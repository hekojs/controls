import Heko from '@hekojs/core'

export default class SideWalkJumpControl extends Heko.Component {
  static attributes () {
    return {
      actions: {
        up: false,
        down: false,
        right: false,
        left: false,
        jump: false
      },
      keyboard: null,
    }
  }

  listenerDirection = (keys) => {
    this.actions.up = keys['up']
    this.actions.down = keys['down']
    this.actions.right = keys['right']
    this.actions.left = keys['left']
  }
  listenerJump = ({ key }) => {
    if(key === 'space') {
      this.actions.jump = true
    }
  }

  onAdd ({ keyboard }) {
    if (keyboard) this.listen(keyboard)
  }

  onRemove () {
    this.stopListening()
  }

  listen (keyboard) {
    this.keyboard = keyboard
    this.keyboard.events.on('keys', this.listenerDirection)
    this.keyboard.events.on('pressed', this.listenerJump)
    return this
  }

  stopListening () {
    if (this.keyboard) {
      this.keyboard.events.off('keys', this.listenerDirection)
      this.keyboard.events.off('pressed', this.listenerJump)
      this.keyboard = null
    }
    return this
  }
}