/*
    年/月/日/时/分：2022/6/4/16/30 -->
    IDE名称：WebStorm -->
    开发系统：Windows11 -->
    作者：JinPeng -->
*/

//页面权限控制中心


import router from "./router";
import store from "./store";
import {message} from "./libs";


/*处理需要登录后才能访问的页面权限*/
router.beforeEach((to, from) => {
    // 无需登录的页面访问
    if (!to.meta.user) {
        return
    }
    // 已登录，可进入
    if (store.getters.token) {
        return true
    }

    // 未登录，警告然后返回首页
    message('warn', '登录失效，请重新登录!')
    return '/'
})

