import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/cascade-area',
      component: () => import('./demos/cascade-area.vue')
    },
    {
      path: '/pagination',
      component: () => import('./demos/pagination.vue')
    },
    {
      path: '/sticky',
      component: () => import('./demos/sticky.vue')
    },
  ]
})
const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.mount('#app')
