import http from '../utils/http.js' //导入封装的axios
import apis from '../utils/api.js' //导入封装的apis

export function search (params = {}) { // 从外部接受参数，没有参数默认为空对象
       return http.get('/search', params) // return对应的get/post方法，第一个填路径，第二个给参数对象
}