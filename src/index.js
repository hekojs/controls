import Heko from '@hekojs/core'
import Keyboard from './Inputs/Keyboard'
import Components from './Components'
import Plugin from './Plugin'

Heko.registerComponents(Components)

export default {
  Inputs: {
    Keyboard
  },
  Components,
  Plugin
}