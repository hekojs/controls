import keyboardKey from 'keyboard-key'
import Events from 'events'

export default class Keyboard {
  constructor (world, mapping) {
    this.mapping = Object.assign({
      // Arrows
      'ArrowUp': 'up',
      'ArrowDown': 'down',
      'ArrowRight': 'right',
      'ArrowLeft': 'left',
      // WASD
      'w': 'up',
      'd': 'right',
      's': 'down',
      'a': 'left',
      // Other
      ' ': 'space',
    }, mapping)

    this.pressed = {}
    Object.values(this.mapping).forEach(key => this.pressed[key] = false)
    this.updated = false
    this.events = new Events()

    this._fireKeyPressed(world.ticker)
    this._handleKeypress()
  }

  _fireKeyPressed (ticker) {
    ticker.add(() => {
      for(let key in this.pressed) {
        if(this.pressed[key]) {
          this._fireKeyEvent('pressing', key)
        }
      }
    })
  }

  _handleKeypress () {
    document.addEventListener('keydown', event => {
      const key = this._resolveKey(event)

      if (!(key in this.pressed) || this.pressed[key] === false) {
        this.pressed[key] = true
        this._fireKeyEvent('pressed', key)
        this._fireAllKeysEvent()
      }
    })

    document.addEventListener('keyup', event => {
      const key = this._resolveKey(event)

      if (!(key in this.pressed) || this.pressed[key] === true) {
        this.pressed[key] = false
        this._fireKeyEvent('released', key)
        this._fireAllKeysEvent()
      }
    })
  }

  _resolveKey(event) {
    let key = keyboardKey.getKey(event)
    if(key in this.mapping) {
      key = this.mapping[key]
    }
    return key
  }

  _fireKeyEvent(name, key) {
    this.events.emit(name, {key})
  }

  _fireAllKeysEvent() {
    this.events.emit('keys', this.pressed)
  }
}
