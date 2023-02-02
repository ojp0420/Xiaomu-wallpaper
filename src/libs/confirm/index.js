/*
    年/月/日/时/分：2022/6/13/13/47 -->
    IDE名称：WebStorm -->
    开发系统：Windows11 -->
    作者：JinPeng -->
*/
import {h, render} from "vue";
import confirmComponent from "./index.vue"

/**
 *
 * @param {*} title 标题
 * @param {*} content 文本
 * @param {*} cancelText 取消按钮文本
 * @param {*} confirmText 确定按钮文本
 * @returns
 */
export const confirm = (
    title,
    content,
    cancelText = '取消',
    confirmText = '确定'
) => {
    const Pmise = new Promise((resolve, reject) => {
        // 允许只传content
        if (title && !content) {
            content = title
            title = ""
        }
        // 关闭回调
        const close = () => render(null, document.body)
        // 取消按钮回调
        const cancelHandler = () => reject(new Error("取消按钮点击"))
        // 确定按钮回调
        const confirmHandler = () => resolve()
        const vnode = h(confirmComponent, {
            title,
            content,
            cancelText,
            confirmText,
            confirmHandler,
            cancelHandler,
            close
        })
        render(vnode, document.body)
    })
    return Pmise
}
