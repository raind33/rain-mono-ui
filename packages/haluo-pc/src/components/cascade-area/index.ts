import CascadeArea from './src/index.vue'

import type { App } from 'vue'
import type { SFCWithInstall } from '@utils/types'

CascadeArea.install = (app: App): void => {

  app.component(CascadeArea.name, CascadeArea)
}

const _CascadeArea = CascadeArea as SFCWithInstall<typeof CascadeArea>

export default _CascadeArea
export const ElCascadeArea = _CascadeArea
