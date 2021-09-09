import Pagination from './src/index.vue'

import type { App } from 'vue'
import type { SFCWithInstall } from '@utils/types'

Pagination.install = (app: App): void => {
  app.component(Pagination.name, Pagination)
}

const _Pagination = Pagination as SFCWithInstall<typeof Pagination>

export default _Pagination
export const HaluoPagination = _Pagination
