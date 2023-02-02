/*
    年/月/日/时/分：2022/6/4/18/52 -->
    IDE名称：WebStorm -->
    开发系统：Windows11 -->
    作者：JinPeng -->
*/
import {computed} from "vue";
import {PC_DEVICE_WIDTH} from "../constants/index";
import {useWindowSize} from "@vueuse/core/index";

const {width} = useWindowSize()
/*
* 判断当前是否为移动端设备，判断依据是屏幕宽度是否小于一个指定的宽度（1280）
* */
export const isMobileTerminal = computed(() => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    )
})

/*
* 动态指定rem基准值 最大为40px
* 根据用户的屏幕宽度 进行一些计算 把计算出来的值赋值给HTML根标签作为fontsize大小
* */
export const useREM = () => {
    // 定义最大的fontsize
    const MAX_FONT_SIZE = 40
    //监听html文档解析完成事件
    document.addEventListener('DOMContentLoaded', () => {
        // 拿到HTML标签
        const html = document.querySelector('html')
        // 计算html标签
        let fontSize = window.innerWidth / 10 > MAX_FONT_SIZE ? MAX_FONT_SIZE : window.innerWidth / 10
        // 赋值给html
        html.style.fontSize = fontSize + 'px'
    })
}

