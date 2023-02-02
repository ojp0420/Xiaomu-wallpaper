/*
    年/月/日/时/分：2022/6/9/23/39 -->
    IDE名称：WebStorm -->
    开发系统：Windows11 -->
    作者：JinPeng -->
*/
/*
* 改变系统的主题样式
* */

import store from "../store";
import {THEME_DARK, THEME_SYSTEM, THEME_LIGHT} from "@/constants"
import {watch} from "vue";

/*创建MediaQueryList实例 用来监听系统主题的变化*/
let matchMedia = window.matchMedia('(prefers-color-scheme: dark)')

const watchSystemThemeChange = () => {
    // 监听主题变更
    matchMedia.onchange = function () {
        changeTheme(THEME_SYSTEM)
    }
}

const changeTheme = (val) => {
    // html 的 class
    let themeClassName = ''
    switch (val) {
        case THEME_LIGHT:
            themeClassName = 'light'
            break
        case THEME_DARK:
            themeClassName = 'dark'
            break
        case THEME_SYSTEM:
            watchSystemThemeChange()
            themeClassName = matchMedia.matches ? 'dark' : 'light'
            break
    }
    // 修改 html 的 class
    document.querySelector('html').className = themeClassName
}
watchSystemThemeChange()
export default () => {
    watch(() => store.getters.themeType, (val) => changeTheme(val), {
        // 初始执行一次
        immediate: true
    })
}
