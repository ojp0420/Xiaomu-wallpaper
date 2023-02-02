/*
    年/月/日/时/分：2022/6/4/16/33 -->
    IDE名称：WebStorm -->
    开发系统：Windows11 -->
    作者：JinPeng -->
*/
//vuex 全局状态访问中心
import createPersistedState from 'vuex-persistedstate'
import {createStore} from "vuex";
import category from "./modules/category";
import theme from "./modules/theme";
import pexels from "./modules/pexels";
import app from "./modules/app";
import searchHistory from "./modules/searchHistory";
import userInfo from "./modules/userInfo";
import getters from "./getters"


export default createStore({
    getters,
    modules: {
        category,
        theme,
        pexels,
        app,
        searchHistory,
        userInfo,
    },
    plugins: [
        createPersistedState({
            // 保存到 localStorage 中的 key
            key: 'imooc-front-my-study',
            // 需要保存的模块
            paths: ['category', 'theme', 'searchHistory', "userInfo"]
        })]
})