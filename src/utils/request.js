/*
    年/月/日/时/分：2022/6/5/15/50 -->
    IDE名称：WebStorm -->
    开发系统：Windows11 -->
    作者：JinPeng -->
*/
import axios from "axios";
import store from "../store";

const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_API, // 自动判断是否为开发环境
    timeout: '10000'
})
// 请求拦截器
request.interceptors.request.use(
    config => {
        // 添加 icode
        config.headers.icode = '760E73D71093A27F'
        // 如果token存在 注入token
        if (store.getters.token) config.headers.Authorization = `Bearer ${store.getters.token}`
        // 必须返回 config
        return config
    },
    (error) => {
        // 处理 token 超时问题
        error.response && error.response.data && error.response.data.code === 401 && store.dispatch('user/logout')
        Promise.reject(error)
    }
)

//响应拦截器
request.interceptors.response.use(responce => {
    const {success, message, data} = responce.data
    //请求成功
    if (success) {
        return data
    }
    // TODO:业务请求错误
    return Promise.reject(new Error(message))

})


export default request