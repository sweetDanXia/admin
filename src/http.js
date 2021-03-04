import axios from 'axios'

// axios.create 创建一个实例 baseURL可以先写上本地后台假设端口3000
const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})

export default http