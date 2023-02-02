/*
    年/月/日/时/分：2022/6/15/15/08 -->
    IDE名称：WebStorm -->
    开发系统：Windows11 -->
    作者：JinPeng -->
*/
import {userLogin, getProfile, userRegister} from "../../api/sys";
import md5 from "md5"
import {message} from "../../libs";

export default ({
    namespaced: true,
    actions: {
        /*用户登录*/
        login: async (context, payload) => {
            const {password} = payload
            const data = await userLogin({...payload, password: password ? md5(password) : ""})
            context.commit("setToken", data.token)
        },
        /*获取用户信息*/
        UserInfo: (context) => {
            getProfile().then((response => {
                context.commit("setUserInfo", response)
                message('success', `欢迎您 ${response.vipLevel ? '尊贵的 VIP' + response.vipLevel + ' 用户 ' + response.nickname : response.nickname} `, 6000)
            }))
        },
        /*退出登录*/
        logout: (context) => {
            context.commit('setToken', '')
            context.commit('setUserInfo', {})
            // 退出登录之后，重新刷新下页面，因为对于前台项目而言，用户是否登录（是否为 VIP）看到的数据可能不同
            location.reload()
        },
        /*用户注册*/
        userRegister: (context, payload) => {
            const {password} = payload
            return userRegister({...payload, password: password ? md5(password) : ""})

        },

    },
    mutations: {
        /*保存Token*/
        setToken: (state, newToken) => state.token = newToken,
        /*保存用户信息*/
        setUserInfo: (state, userInfo) => state.userInfo = userInfo,
    },
    state: {
        token: "", // 登录之后的token
        userInfo: {},
    },
})
