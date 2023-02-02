/*
    年/月/日/时/分：2022/6/12/13/58 -->
    IDE名称：WebStorm -->
    开发系统：Windows11 -->
    作者：JinPeng -->
*/
/*
* 注册图片懒加载指令
* */
import {useIntersectionObserver} from "@vueuse/core";
// 图片懒加载：在用户未看到图片时，不加载图片，在用户可以看到图片后加载图片
// 通过 useIntersectionObserver 函数判断用户是否看到了图片
export default {
    mounted(el) {
        const imgSrc = el.src // 拿到当前的src
        el.src = "" // 把src变为空
        const {stop} = useIntersectionObserver(el, ([{isIntersecting}]) => {
            if (isIntersecting) {
                el.src = imgSrc // 图片可见时 加载图片
                stop() // 停止监听
            }
        })
    }
}