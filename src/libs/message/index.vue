<!-- 年/月/日/时/分：2022/6/13/22/34 -->
<!-- IDE名称：WebStorm -->
<!-- 开发系统：Windows11 -->
<!-- 作者：JinPeng -->

<template>
  <transition name="down" @after-leave="destroy">
    <div
        v-show="isVisable"
        class="min-w-[420px] fixed top-[20px] left-[50%] translate-x-[-50%] z-50 flex items-center px-3 py-1.5 rounded-sm border cursor-pointer"
        :class="styles[type].containerClass"
    >
      <m-svg-icon
          :name="styles[type].icon"
          :fillClass="styles[type].fillClass"
          class="h-1.5 w-1.5 mr-1.5"
      ></m-svg-icon>
      <span class="text-sm" :class="styles[type].textClass">
        {{ content }}
      </span>
    </div>
  </transition>
</template>


<script>
// 样式表数据
const styles = {
  // 警告
  warn: {
    icon: 'warn',
    fillClass: 'fill-warn-300',
    textClass: 'text-warn-300',
    containerClass:
        'bg-warn-100 border-warn-200  hover:shadow-lg hover:shadow-warn-100'
  },
  // 错误
  error: {
    icon: 'error',
    fillClass: 'fill-error-300',
    textClass: 'text-error-300',
    containerClass:
        'bg-error-100 border-error-200  hover:shadow-lg hover:shadow-error-100'
  },
  // 成功
  success: {
    icon: 'success',
    fillClass: 'fill-success-300',
    textClass: 'text-success-300',
    containerClass:
        'bg-success-100 border-success-200  hover:shadow-lg hover:shadow-success-100'
  }
}

</script>

<script setup>
import {onMounted, ref} from "vue";
import mSvgIcon from "@/libs/svg-icon/index.vue"

const props = defineProps({
  type: {
    type: String,
    required: true,
    validate(val) {
      const result = Object.keys(styles).includes(val)
      if (!result) throw new Error(`你的type必须是${Object.keys(styles).join("、")}中的一个`)
      return result
    }
  }, // 消息类型
  content: {type: String, required: true}, // 描述文本
  duration: {type: Number}, // 展示时长
  destroy: {type: Function}, // 关闭的回调
})

const isVisable = ref(false)  //控制是否展示
/**保证动画展示，需要在 mounted 之后进行展示*/
onMounted(() => {
  isVisable.value = true
  /**延迟时间关闭*/
  setTimeout(() => isVisable.value = false, props.duration)
})
</script>

<style lang="scss" scoped>
.down-enter-active,
.down-leave-active {
  transition: all 0.5s;
}

.down-enter-from,
.down-leave-to {
  opacity: 0;
  transform: translate3d(-50%, -100px, 0);
}
</style>