import Heko from '@hekojs/core'

export default class TopDownRotateThrustControl extends Heko.Component {
  static attributes () {
    return {
      actions: new Heko.Schema.MapSchema({ forward: false, brake: false, right: false, left: false }),
      keyboard: null,
    }
  }

  static multiplayerSchema = {
    actions: { map: 'boolean' }
  }

  listener = (keys) => {
    const multiplayer = this.getWorld().plugins.get('Multiplayer')
    if (multiplayer && multiplayer.isClient()) {
      multiplayer.sendMessage(this.getNamespace() + '.actions', {
        'forward': keys['up'],
        'brake': keys['down'],
        'right': keys['right'],
        'left': keys['left'],
      })
    }

    this.actions.forward = keys['up']
    this.actions.brake = keys['down']
    this.actions.right = keys['right']
    this.actions.left = keys['left']
  }

  onAdd () {
    const multiplayer = this.getWorld().plugins.get('Multiplayer')
    if (multiplayer && multiplayer.isServer()) {
      multiplayer.onMessage(this.getNamespace() + '.actions', actions => {
        for (let name in actions) this.actions[name] = actions[name]
      })
    }
  }

  onRemove () {
    this.stopListening()
  }

  listen (keyboard) {
    this.keyboard = keyboard
    this.keyboard.events.on('keys', this.listener)
    return this
  }

  stopListening () {
    if (this.keyboard) {
      this.keyboard.events.off('keys', this.listener)
      this.keyboard = null
    }
    return this
  }
}