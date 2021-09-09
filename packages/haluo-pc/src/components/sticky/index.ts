import type { App } from 'vue'
import type { SFCWithInstall } from '@utils/types'

import Sticky from './src/index.vue'

Sticky.install = (app: App) => {
  app.component(Sticky.name, Sticky)
}

const _Sticky = Sticky as SFCWithInstall<typeof Sticky>

export default _Sticky
export const HaluoSticky = _Sticky
