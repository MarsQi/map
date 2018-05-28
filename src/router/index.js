import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/home/index.vue'
import details from '@/components/details/index.vue'
Vue.use(Router);
//配置路由信息
export default new Router({
  routes: [{
    path: '/',
    name: 'index',
    component: index
  }, {
    path: '/details',
    name: 'details',
    component: details
  }]
})
