/*
    年/月/日/时/分：2022/6/6/12/59 -->
    IDE名称：WebStorm -->
    开发系统：Windows11 -->
    作者：JinPeng -->
*/

// import svgIcon from './svg-icon/index.vue'
// import popup from './popup/index.vue'
import {defineAsyncComponent} from "vue";

export {confirm} from './confirm/index.js'
export {message} from "./message/index.js"

export default {
    install(app) {
        // app.component('m-svg-icon', svgIcon)
        // app.component('m-popup', popup)

        // TODO 自动注册通用组件
        // 获取当前路径任意文件夹下的index.vue文件
        const components = import.meta.glob('./*/index.vue')

        // 遍历获取到的组件模块
        for (const [key, value] of Object.entries(components)) {
            const componentName = 'm-' + key.replace('./', '').split('/')[0]
            //通过 defineAsyncComponent 异步导入指定路径下的组件
            app.component(componentName, defineAsyncComponent(value))
        }
    }
}

