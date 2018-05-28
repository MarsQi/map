import axios from 'axios'
import qs from 'qs'
var $axios = axios.create({
  //测试地址
    baseURL: 'http://116.10.197.134:8990/sunEee-goods',
  //正式环境接口地址
  // baseURL: '/api',
  // timeout: 5000,
  headers: {
    'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
  }
});
axios.defaults.withCredentials = true;
//POST传参序列化
$axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  _.toast("错误的传参", 'fail');
  return Promise.reject(error);
});

// 添加一个响应拦截器
$axios.interceptors.response.use(function (res) {
  //处理登录超时
  if (res.data.code === 2) {
    window.location.reload()
  }
  return res;
}, function (err) {
  return Promise.reject(error);
});

export default $axios
