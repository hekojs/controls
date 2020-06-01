import Events from 'events'

export default class Mouse {
  constructor (view, renderer) {
    this.view = view
    this.renderer = renderer

    this.events = new Events()
    this._events = new Events()

    this.borders = {
      top: false,
      right: false,
      bottom: false,
      left: false
    }

    this.inside = true
    this.isDown = false
    this.click = {
      x: null,
      y: null
    }

    this._start()
  }

  _start () {
    this._createCursor()
    this._createSelection()

    this._applyPreferences()
    this._fireMouseEvents()

    this._handleLeave()
    this._handleMove()
    this._handleMoveOnBorders()

    this._handleClickDown()
    this._handleClickUp()
  }

  _getRelativePositionFromMouseEvent (event) {
    return {
      x: event.clientX / this.renderer.resolution.absolute.scale,
      y: event.clientY / this.renderer.resolution.absolute.scale
    }
  }

  _fireMouseEvents () {
    let throttle = []
    Ticker.add(() => {
      throttle = []
    })

    const events = {
      onmousemove: 'move',
      onmouseout: 'out',
      onmouseup: 'up',
      onmousedown: 'down',
      oncontextmenu: 'context'
    }
    for (const name in events) {
      this.view[name] = (event) => {
        event.preventDefault()
        if (!throttle.includes(events[name])) {
          this._events.emit(events[name], event)
          throttle.push(events[name])
        }
      }
    }
  }

  _handleMove () {
    this._events.on('move', (event) => {
      const coordinates = this._getRelativePositionFromMouseEvent(event)

      if (this.isDown) {
        this._updateSelection(this.click.x, this.click.y, coordinates.x - this.click.x, coordinates.y - this.click.y)
        this.events.emit('selecting', {
          ...this.click,
          width: coordinates.x - this.click.x,
          height: coordinates.y - this.click.y
        })
      }

      this.events.emit('move', coordinates)
      this._updateCursor(coordinates.x, coordinates.y)
    })
  }

  _handleClickUp () {
    this._events.on('up', (event) => {
      const coordinates = this._getRelativePositionFromMouseEvent(event)

      if (event.button === 0) {
        this.events.emit('clickUp', coordinates)

        // If we did not moved during the click
        if (coordinates.x === this.click.x && coordinates.y === this.click.y) {
          this.events.emit('click', coordinates)
        } else {
          this.events.emit('select', {
            ...this.click,
            width: coordinates.x - this.click.x,
            height: coordinates.y - this.click.y
          })
        }

        // Remove the click
        this.isDown = false
        this.click = {
          x: null,
          y: null
        }

        // If rect was shown, hide it
        this._clearSelection()
      } else if (event.button === 2) {
        this.events.emit('rightClick', coordinates)
      }
    })
  }

  _handleClickDown () {
    this._events.on('down', (event) => {
      const coordinates = this._getRelativePositionFromMouseEvent(event)

      if (event.button === 0) {
        this.isDown = true
        this.click = coordinates
        this.events.emit('clickDown', coordinates)
      }
    })
  }

  _handleLeave () {
    this._events.on('out', () => {
      this.inside = false
      this.events.emit('left')
    })
    this._events.on('move', () => {
      if (!this.inside) {
        this.inside = true
        this.events.emit('back')
      }
    })
  }

  _handleMoveOnBorders () {
    const detection = {
      x: this.view.width * 0.05,
      y: this.view.height * 0.05
    }

    this._events.on('move', (event) => {
      this.borders.left = this.inside && event.offsetX < detection.x
      this.borders.right = this.inside && event.offsetX > this.view.width - detection.x
      this.borders.top = this.inside && event.offsetY < detection.y
      this.borders.bottom = this.inside && event.offsetY > this.view.height - detection.y
      this.events.emit('onBorders', { borders: this.borders })
    })
    this._events.on('out', () => {
      this.borders.left = false
      this.borders.right = false
      this.borders.top = false
      this.borders.bottom = false
      this.events.emit('onBorders', { borders: this.borders })
    })
  }

  _createCursor (renderer) {
    this.cursor = new PIXI.Graphics()
    this.cursor.lineStyle(1, 0x00CD05, 1)
    this.cursor.moveTo(0, 0)
    this.cursor.lineTo(0, 10)
    this.cursor.lineTo(2, 5)
    this.cursor.lineTo(8, 8)
    this.cursor.lineTo(0, 0)
    this.cursor.endFill()

    this.renderer.containers.ui.addChild(this.cursor)
  }

  _updateCursor (x, y) {
    this.cursor.x = x
    this.cursor.y = y
  }

  _createSelection (renderer) {
    this.selection = new PIXI.Graphics()

    this.renderer.containers.ui.addChild(this.selection)
  }

  _clearSelection () {
    this.selection.clear()
  }

  _updateSelection (fromX, fromY, width, height) {
    this.selection.clear()
    this.selection.lineStyle(1, 0x00CD05, 0.5)
    this.selection.beginFill(0x00CD05, 0.1)
    this.selection.drawRect(fromX, fromY, width, height)
    this.selection.endFill()
  }
}
