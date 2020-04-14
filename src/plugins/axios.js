import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// axios拦截请求，添加token
// 后端以校验是否有权限
axios.interceptors.request.use(config => {
    // console.log(config)
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config // 最后必须return config
})
Vue.prototype.$http = axios
