<!-- 年/月/日/时/分：2022/6/13/13/10 -->
<!-- IDE名称：WebStorm -->
<!-- 开发系统：Windows11 -->
<!-- 作者：JinPeng -->
<template>
  <div>
    <!-- 蒙版 -->
    <transition name="fade">
      <div
          v-if="variable.isVisable"
          @click="close"
          class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
      ></div>
    </transition>
    <!-- 内容 -->
    <transition name="up">
      <div
          v-if="variable.isVisable"
          class="w-[80%] fixed top-1/3 left-[50%] translate-x-[-50%] z-50 px-2 py-1.5 rounded-sm border dark:border-zinc-600 cursor-pointer bg-white dark:bg-zinc-800 xl:w-[35%]"
      >
        <!-- 标题 -->
        <div class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2">{{ title }}</div>
        <!-- 内容 -->
        <div class="text-base text-zinc-900 dark:text-zinc-200 mb-2">{{ content }}</div>
        <!-- 按钮 -->
        <div class="flex justify-end">
          <m-button type="info" class="mr-2" @click="onCancelClick">{{ cancelText }}</m-button> <!--取消按钮-->
          <m-button type="primary" @click="onConfirmClick">{{ confirmText }}</m-button><!--确定按钮-->
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup>
/*使用方法调用组件的 全局组件也需要主动导入*/
import mButton from "../button/index.vue"
import {onMounted, reactive} from "vue";

/*组件需要使用到的数据*/
const props = defineProps({
  title: {type: String},  // 标题
  content: {type: String, required: true},  // 描述
  confirmText: {type: String, default: "确定"},  // 确认按钮文本
  cancelText: {type: String, default: "取消"},  // 取消按钮文本
  confirmHandler: {type: Function},  // 确认按钮回调
  cancelHandler: {type: Function},  // 取消按钮回调
  close: {type: Function}  // 关闭组件的回调
})

// 响应式变量
const variable = reactive({
  isVisable: false
})

/*为了保留动画 所以需要在页面挂载时 显示组件*/
onMounted(() => variable.isVisable = true)

const duration = '0.5s'  // 关闭动画执行时间

/*组件关闭时执行*/
const close = () => {
  variable.isVisable = false
  setTimeout(() => {
    props.close && props.close()
  }, parseInt(duration.replace('0.', '').replace('s', '')) * 100)
}
/*点击确定按钮时执行*/
const onConfirmClick = () => {
  props.confirmHandler && props.confirmHandler()
  close()
}
/*点击取消按钮时执行*/
const onCancelClick = () => {
  props.cancelHandler && props.cancelHandler()
  close()
}

</script>


<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all v-bind(duration);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.up-enter-active,
.up-leave-active {
  transition: all v-bind(duration);
}

.up-enter-from,
.up-leave-to {
  opacity: 0;
  transform: translate3d(-50%, 100px, 0);
}
</style>