import axios from 'axios'
import Vue from 'vue'
import router from './router'

// axios.create 创建一个实例 baseURL可以先写上本地后台假设端口3000
const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})

http.interceptors.request.use(config => {
    if (localStorage.getItem('token')) {
        config.headers.Authorization = 'Bearer ' + (localStorage.getItem('token') || '')
    }
    return config
}, err => {
    return Promise.reject(err)
})

http.interceptors.response.use(res => {
    return res
}, err => {
    // 状态码大于等于400
    console.log(err.response.status)
    if (err.response.status == 401) {
        router.push('/login')
    }
    if (err.response.data.message) {
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.message
        })
    }
    return Promise.reject(err)
})

export default http