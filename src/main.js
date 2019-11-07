import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/plugins/element' // element
import '@/plugins/icon'
import '@/router/permission' // permission control

Vue.config.productionTip = false

/**
 *《调试 template》
 * 场景:在Vue开发过程中
 * 经常会遇到template模板渲染时JavaScript变量出错的问题
 * 此时也许你会通过console.log来进行调试
 * 这时可以在开发环境挂载一个 log 函数
 * 注:__num 是为了保证在循环Table中只打印一次
 * 使用:组件内部:
 * <div>{{$log(info)}}</div>
 */
Vue.prototype.__num = 0
Vue.prototype.$log = function(...val) {
  if (!this.__num) window.console.log(...val)
  ++this.__num
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 测试
