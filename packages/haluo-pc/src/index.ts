import { App } from 'vue'
import CascadeArea from './components/cascade-area'
const components = [CascadeArea]

const install: any = function (app: App) {
  if (install.installed) return
  install.installed = true
  components.map(component => app.component(component.name, component))
  // components.map(component => Vue.use(component))
}

export default {
  install,
  ...components
}
