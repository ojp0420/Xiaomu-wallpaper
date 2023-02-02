/*
    年/月/日/时/分：2022/6/9/23/14 -->
    IDE名称：WebStorm -->
    开发系统：Windows11 -->
    作者：JinPeng -->
*/
/*
* 管理系统的主题样式
* */

import {THEME_LIGHT} from "@/constants"

export default ({
    namespaced: true,
    action: {},
    mutations: {
        // 切换主题样式
        changeThemeType: (state, newTheme) => state.themeType = newTheme
    },
    state: {
        themeType: THEME_LIGHT
    },
})
