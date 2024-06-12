
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false


App.mpType = 'app'	

const app = new Vue({
    ...App
})
app.$mount()

// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
import { myRequest } from './util/api.js'
export function createApp() {
  const app = createSSRApp(App)
  
  //全局变量
  app.config.globalProperties.$myRequest=myRequest
  app.config.globalProperties.$hostURL='http://localhost:9090'
  
  return {
    app
  }
}

// #endif