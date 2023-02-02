/*
    年/月/日/时/分：2022/6/15/14/02 -->
    IDE名称：WebStorm -->
    开发系统：Windows11 -->
    作者：JinPeng -->
*/
import request from "../utils/request";

/*滑快验证*/
export const getCaptcha = (data) => request({url: "/sys/captcha", method: "post", data,})

/*用户登录*/
export const userLogin = (data) => request({url: '/sys/login', method: 'post', data,})

/*获取用户信息*/
export const getProfile = () => request({url: '/user/profile', method: "get"})

/*用户注册*/
export const userRegister = (data) => request({url: "/sys/register", method: "post", data})

/*修改用户信息*/
export const putProfile = data => request({url: "/user/profile", method: "put", data})