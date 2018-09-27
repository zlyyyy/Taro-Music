import axios from 'axios'

// https://blog.csdn.net/frank_come/article/details/80010611
//默认URL
axios.defaults.baseURL = 'http://localhost:3000/'
//配置允许跨域携带cookie
axios.defaults.withCredentials = true
//配置超时时间
axios.defaults.timeout = 100000
//标识ajax请求
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
//请求拦截
axios.interceptors.request.use(config => {
    // config.setHeaders([])
    return config
})
axios.interceptors.response.use(response => {
    // 在这里你可以判断后台返回数据携带的请求码
   if (response.data.code === 200 || response.data.code === '200') {
        return response.data.data || response.data
   }else {
         // 非200请求抱错
         throw Error(response.data.msg || '服务异常')
    }
})
export default axios