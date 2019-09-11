import Vue from 'vue'

import Master from './components/layouts/Master'
import routes from './routes'
import {store} from './store/store'
import VueRouter from 'vue-router'
import CxltToastr from 'cxlt-vue2-toastr'
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'
window.eventBus = new Vue()
Vue.config.productionTip = false
Vue.use(VueRouter)

var toastrConfigs = {
  position: 'bottom right',
  showDuration: 2000,
  timeOut: 5000,
  progressBar: true
}
Vue.use(CxltToastr, toastrConfigs)

const router = new VueRouter({
  routes,
  mode:'history'
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) { 
    if (!store.getters.loggedIn) {
      next({
        name: 'login',      
      })
    } else {
      next()
    }
  } else {
    next() 
  }
})
new Vue({
  store:store,
  router: router,
  render: h => h(Master),
}).$mount('#app')
