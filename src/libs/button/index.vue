<!-- 年/月/日/时/分：2022/6/8/12/25 -->
<!-- IDE名称：WebStorm -->
<!-- 开发系统：Windows11 -->
<!-- 作者：JinPeng -->

<template>
  <button
      class="text-sm text-center rounded duration-150 flex justify-center items-center"
      :class="[
      typeEnum[type],
      sizeEnum[sizeKey].button,
      { 'active:scale-105': isActiveAnim }
    ]" @click.stop="onBtnClick">
    <!-- 是否展示Loading-->
    <m-svg-icon v-if="loading" name="loading" class="w-2 h-2 animate-spin mr-1"/>
    <!-- 是否展示icon按钮-->
    <m-svg-icon v-if="icon" :name="icon" class="m-auto" :class="sizeEnum[sizeKey].icon" :color="iconColor"
                :fillClass="iconClass"/>
    <!-- 文字按钮 (使用插槽展示)-->
    <slot v-else/>
  </button>
</template>
<!--TODO 开发者指定可选风格-->
<script>
// type 可选项：表示按钮风格
const typeEnum = {
  primary: "text-white bg-zinc-800 hover:bg-zinc-900 active:bg-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-700 dark:active:bg-zinc-700",
  main: 'text-white  bg-main hover:bg-hover-main active:bg-main dark:bg-zinc-900 ark:hover:bg-zinc-700 dark:active:bg-zinc-700 ',
  info: 'text-zinc-800 bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-200  dark:text-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700'
}
// size 可选项：表示按钮大小。区分文字按钮和icon按钮
const sizeEnum = {
  default: {
    button: 'w-8 h-4 text-base',
    icon: ''
  },
  small: {
    button: 'w-7 h-3 text-base',
    icon: ''
  },
  'icon-default': {
    button: 'w-4 h-4',
    icon: 'w-1.5 h-1.5'
  },
  'icon-small': {
    button: 'w-3 h-3',
    icon: 'w-1.5 h-1.5'
  }
}

const EMITS_CLICK = 'click'

</script>

<!--TODO 指定props让开发者可以控制当前按钮的样式-->
<script setup>
import {computed} from "vue";
import mSvgIcon from "../svg-icon/index.vue"


const props = defineProps({
//  icon 图标名
  icon: {
    type: String
  },
//  icon 图标颜色
  iconColor: {
    type: String
  },
//  icon 图标类名（与tailwind相匹配）
  iconClass: {
    type: String
  },
//  按钮风格
  type: {
    type: String,
    default: "main",
    validator(value) {
      //  获取所有的可选按钮的风格
      const keys = Object.keys(typeEnum)
      //  判断开发者指定风格是否在可选风格中
      const result = keys.includes(value)
      //  如果不在则抛出错误给予提示
      if (!result) {
        throw new Error(`你的type必须是${keys.join('、')}中的一个`)
      }
      return result
    }
  },
//  大小风格
  size: {
    type: String,
    default: "default",
    validator(value) {
      //  获取所有的可选大小 （注意剔除 icon 开头的元素，因为我们期望开发者输入 size="default"，但不期望开发者输入 size="icon-default"）
      const keys = Object.keys(sizeEnum).filter((key) => !key.includes('icon'))
      // 开发者指定大小是否在可选大小中
      const result = keys.includes(value)
      // 如果不在则给开发者提示
      if (!result) {
        throw new Error(`你的 size 必须是 ${keys.join('、')} 中的一个`)
      }
      // 返回校验结果
      return result
    }
  },
//  按钮点击时是否需要动画
  isActiveAnim: {
    type: Boolean,
    default: true
  },
//  加载状态
  loading: {
    type: Boolean,
    default: false
  }
})
// 因为我们在处理 size 的 prop 时，区分了 icon按钮 和 文字按钮，所以说在指定类名时，需要通过一个 计算属性 判定是否需要增加 icon- 前缀
const sizeKey = computed(() => props.icon ? "icon-" + props.size : props.size)

//处理 按钮点击事件
const emits = defineEmits([EMITS_CLICK])
const onBtnClick = () => !props.loading && emits(EMITS_CLICK)

</script>

<style scoped>

</style>