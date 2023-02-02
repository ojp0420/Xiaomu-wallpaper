/*
    年/月/日/时/分：2022/6/13/22/34 -->
    IDE名称：WebStorm -->
    开发系统：Windows11 -->
    作者：JinPeng -->
*/
import messageComponents from "./index.vue"
import {h, render} from "vue";


export const message = (type, content, duration = 3000) => {

    const destroy = () => render(null, document.body)

    const vnode = h(messageComponents, {
        type,
        content,
        duration,
        destroy,
    })

    render(vnode, document.body)
}