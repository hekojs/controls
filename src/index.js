import Heko from '@hekojs/core'
import Keyboard from './Inputs/Keyboard'
import Components from './Components'
import Systems from './Systems'

Heko.registerComponents(Components)

export default {
  Inputs: {
    Keyboard
  },
  Components,
  Systems
}