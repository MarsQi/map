// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import '@/assets/js/flex.js';
import '@/assets/css/reset.css';
Vue.config.productionTip = false;
import '@/assets/css/iconfont/iconfont.css'
import axios from 'axios'
import qs from 'qs'
import 'video.js/dist/video-js.css'
import '@/assets/css/jpp.css'
import VueVideoPlayer from 'vue-video-player'

// mount with global
Vue.use(VueVideoPlayer)
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;

// If used in Nuxt.js/SSR, you should keep it only in browser build environment
if (process.browser) {
    const VueVideoPlayer = require('vue-video-player/ssr')
    Vue.use(VueVideoPlayer)
}
Vue.prototype.axios = axios;
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
})