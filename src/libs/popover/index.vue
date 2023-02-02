<!-- 年/月/日/时/分：2022/6/8/20/43 -->
<!-- IDE名称：WebStorm -->
<!-- 开发系统：Windows11 -->
<!-- 作者：JinPeng -->

<template>
  <div class="relative" @mouseleave="onMouseleave" @mouseenter="onMouseenter">
    <div ref="referenceTarget">
      <!--具名插槽-->
      <slot name="reference"/>
    </div>
    <!--气泡展示动画-->
    <transition name="slide">
      <!-- 内容DIV-->
      <div v-show="isVisable" :style="contentStyle" class="absolute p-1 z-20 bg-white border rounded-md dark:bg-zinc-900 dark:border-zinc-700"
           ref="contentTarget">
        <!--匿名插槽-->
        <slot/>
      </div>
    </transition>
  </div>
</template>

<script>
// 气泡可选位置的参数
const PROP_TOP_LEFT = 'top-left'
const PROP_TOP_RIGHT = 'top-right'
const PROP_BOTTOM_LEFT = 'bottom-left'
const PROP_BOTTOM_RIGHT = 'bottom-right'

// 定义指定位置的 Enum
const placementEnum = [
  PROP_TOP_LEFT,
  PROP_TOP_RIGHT,
  PROP_BOTTOM_LEFT,
  PROP_BOTTOM_RIGHT
]
</script>


<script setup>
import {nextTick, reactive, ref, watch} from "vue";

// 控制延迟关闭
let timeout = null
// 延迟关闭时长
const DELAY_TIME = 100

// 控制 气泡内容是否展示
const isVisable = ref(false)

const props = defineProps({
  placement: {
    type: String,
    default: PROP_TOP_LEFT,
    validator(val) {
      const result = placementEnum.includes(val)
      // 如果开发者传入的参数 没有则抛出异常
      if (!result) {
        throw new Error(`你的 placement  必须是${placementEnum.join("、")}中的一个`)
      }
      return result
    }
  },
})

//鼠标移入移出事件
const onMouseleave = () => { // 延时装置
  timeout = setTimeout(() => {
    isVisable.value = false
    timeout = null
  }, DELAY_TIME)
}
const onMouseenter = () => {
  isVisable.value = true
  // 再次触发时，清理延时装置
  if (timeout) {
    clearTimeout(timeout)
  }
}


// 弹出层位置
const contentStyle = reactive({
  top: 0,
  left: 0
})

// * 计算元素尺寸
const referenceTarget = ref(null)
const contentTarget = ref(null)
const useElementSize = (target) => {
  if (!target) return {}
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  }
}


// 监听弹出层的显示 只有弹出层显示时 才会计算弹出层的位置
watch(isVisable, (val) => {
  if (!val) return
  nextTick(() => {
    switch (props.placement) {
        //  左上
      case PROP_TOP_LEFT:
        contentStyle.top = 0
        contentStyle.left = -useElementSize(contentTarget.value).width + "px"
        break
        //  右上
      case PROP_TOP_RIGHT:
        contentStyle.top = 0
        contentStyle.left = useElementSize(referenceTarget.value).width + "px"
        break
        //  左下
      case PROP_BOTTOM_LEFT:
        contentStyle.top = useElementSize(referenceTarget.value).height + "px"
        contentStyle.left = -useElementSize(contentTarget.value).width + "px"
        break
        //  右下
      case PROP_BOTTOM_RIGHT:
        contentStyle.top = useElementSize(referenceTarget.value).height + "px"
        contentStyle.left = useElementSize(referenceTarget.value).width + "px"
        break
    }
  })
})


</script>

<style lang="scss" scoped>
/*slide 展示动画*/
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>