<!-- 年/月/日/时/分：2022/6/6/20/03 -->
<!-- IDE名称：WebStorm -->
<!-- 开发系统：Windows11 -->
<!-- 作者：JinPeng -->

<template>
  <Teleport to="body">
    <transition name="fade">
      <!--  蒙版-->
      <div v-if="isOpen" @click="isOpen = !isOpen"
           class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"></div>
    </transition>

    <transition name="popup-down-up">
      <!--  标签内容-->
      <div v-if="isOpen" class="w-screen bg-white z-50 fixed bottom-0 dark:bg-zinc-800" v-bind="$attrs">
        <!-- 通过插槽指定数据形式-->
        <slot/>
      </div>
    </transition>

  </Teleport>
</template>

<script setup>
import {watch} from "vue";
import {useScrollLock, useVModel} from "@vueuse/core";

// 滚动条锁定
const isLocked = useScrollLock(document.body)
const props = defineProps({
  modelValue: {
    required: true,
    type: Boolean
  }
})
// const emits = defineEmits(["update:modelValue"])
const isOpen = useVModel(props)

watch(isOpen, val => isLocked.value = val)

</script>

<style lang="scss" scoped>
// fade 展示动画
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// popup-down-up 展示动画
.popup-down-up-enter-active,
.popup-down-up-leave-active {
  transition: all 0.3s;
}

.popup-down-up-enter-from,
.popup-down-up-leave-to {
  transform: translateY(100%);
}
</style>