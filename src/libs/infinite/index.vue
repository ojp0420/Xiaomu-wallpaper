<!-- 年/月/日/时/分：2022/6/11/20/52 -->
<!-- IDE名称：WebStorm -->
<!-- 开发系统：Windows11 -->
<!-- 作者：JinPeng -->

<template>
  <div>
    <!--瀑布流内容-->
    <slot/>
    <!--用于检验的div盒子-->
    <div ref="loadingTarget" class="h-6 py-4">
      <!--发起请求时显示-->
      <m-svg-icon v-if="loading" class="w-4 h-4 mx-auto animate-spin" name="infinite-load"/>
      <!--没有更多数据时显示-->
      <p v-if="isFinished" class="text-center text-base text-zinc-400">我也是有底线的</p>
    </div>
  </div>
</template>

<script setup>
import {ref, watch} from "vue";
import {useVModel, useIntersectionObserver} from "@vueuse/core";

const props = defineProps({
  modelValue: {type: Boolean, required: true}, // 是否处于加载状态
  isFinished: {type: Boolean, required: true}, // 数据是否全部加载完成
})
const emits = defineEmits(["onLoad", "update:modelValue"])
const loading = useVModel(props)

// 用于判定滚动的元素
const loadingTarget = ref(null)
// 记录当前是否在底部
const targetIsIntersecting = ref(false)

const {stop} = useIntersectionObserver(loadingTarget, ([{isIntersecting}], observerElement) => {
  targetIsIntersecting.value = isIntersecting
  // 当加载更多的视图可见时，加载更多数据
  isIntersecting && emitLoad()
})

const emitLoad = () => {
  // 当加载更多的视图可见时，加载更多数据
  if (targetIsIntersecting.value && !loading.value && !props.isFinished) {
    // 修改加载数据标记
    loading.value = true
    // 触发加载更多行为
    emits('onLoad')
  }
}

/**
 * 监听 loading 的变化，解决数据加载完成后，首屏未铺满的问题
 */
watch(loading, (val) => {
  // 触发 load，延迟处理，等待 渲染和 useIntersectionObserver 的再次触发
  setTimeout(() => {
    emitLoad()
  }, 100)
}, {deep: true})

</script>