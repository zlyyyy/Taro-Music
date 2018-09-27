import http from '../utils/http.js' //导入封装的axios

export function search (params = {}) { 
       return http.get('/search', {
        params
    }) 
}
export function getBanner (params = {}) { 
       return http.get('/banner', {
        params
    }) 
}