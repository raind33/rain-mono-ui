import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import config from './package.json';

const path = require('path')
const banner = `/*!
* ${config.name} v${config.version} ${new Date()}
* (c) 2021 @haluo.
* Released under the MIT License.
*/`;
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@utils': path.resolve(__dirname, 'src/utils')
    }
  },
  plugins: [vue()],
  build: {
    rollupOptions: {
      external: ['vue', 'vue-router'],
      output: {
        banner,
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    },
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'haluo-pc',
      fileName: 'haluo-pc',
      formats: ['es', 'umd']
    }
  }
})
