import { createApp } from 'vue'
import App from './App.vue'
import About from './page/About.vue'
import Home from './page/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
]
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
})
const app = createApp(App)
app.use(router)
app.mount('#app')
