import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

Vue.config.productionTip = false
//引用了axios进来
import axios from 'axios' 
//创建了axios的实例，用它可以顶一个接口根地址，以后就不用重新写了，这样定义在任意一个vue界面可以用this.$http访问到这个实例
Vue.prototype.$http = axios.create({
  baseURL:'http://localhost:3001/api'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
