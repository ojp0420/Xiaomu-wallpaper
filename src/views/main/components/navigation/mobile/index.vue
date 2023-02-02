<!-- 年/月/日/时/分：2022/6/5/15/01 -->
<!-- IDE名称：WebStorm -->
<!-- 开发系统：Windows11 -->
<!-- 作者：JinPeng -->

<template>
  <!--  <m-search></m-search>-->
  <div class="bg-white sticky top-0 left-0 z-10 dark:bg-zinc-900">
    <ul class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden" ref="ulTarget">
      <!-- 选中滑块 -->
      <li ref="sliderTarget" :style="sliderStyle"
          class="absolute h-[22px] bg-zinc-900 rounded-lg duration-200 dark:bg-zinc-800"></li>

      <!-- 汉堡按钮-->
      <li class="fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white z-20 shadow-l-white dark:bg-zinc-900 dark:shadow-l-zinc"
          @click="isOpenPopup= !isOpenPopup">
        <m-svg-icon class="w-1.5 h-1.5" name="hamburger"/>
      </li>

      <!-- 面包屑组件 -->
      <m-popup v-model="isOpenPopup">
        <MenuVue @onItemClick="onItemClick"></MenuVue>
      </m-popup>

      <!-- 标签 -->
      <li
          class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
          v-for="(category,index) in categorys"
          :class="{'text-zinc-100':$store.getters.currentCategoryIndex === index}"
          :key="category.id"
          :ref="setItemRef"
          @click="onItemClick(category)">
        {{ category.name }}
      </li>
    </ul>
  </div>

</template>

<script setup>
import MenuVue from "@/views/main/components/menu/index.vue"
import {ref, watch, onBeforeUpdate, computed, nextTick,} from "vue";
import {useScroll} from '@vueuse/core'
import {useStore} from "vuex"

const store = useStore() // 实例化store
const categorys = computed(() => store.getters.categorys)

// 滑块偏移样式
const sliderStyle = ref({
  transform: "translateX(0px)",
  width: "54px"
})
//选中item下标
const currentCategoryIndex = ref(0)
// 获取ul元素的偏移量
const ulTarget = ref(null)
const {x: ulScrollLeft} = useScroll(ulTarget)
// 所有的标签元素
let itemRefs = []
const setItemRef = (el) => {
  if (el) itemRefs.push((el))
}
//标签点击事件
const onItemClick = (item) => {
  store.commit("app/changeCurrentCategory", item)
  isOpenPopup.value = false
}
// 监听索引值的变化 当索引值发生变化 滑块偏移距离也发生变化
watch(() => store.getters.currentCategoryIndex, (val) => {
  console.log(val)
//  获取选中元素的left width
  const {left, width} = itemRefs[val].getBoundingClientRect()
//  设置sliderStyle属性
  sliderStyle.value = {
    // ul 横向滚动位置 + 当前元素的 left 偏移量 - padding
    transform: `translateX(${ulScrollLeft.value + left - 10 + 'px'})`,
    width: width + 'px'
  }
})
//因为每次数据更新都会对itemRefs赋值 所以数据更新之前 要对其进行初始化
onBeforeUpdate(() => itemRefs = [])
//控制是否展示m-popup组件
const isOpenPopup = ref(false)


</script>


<style scoped>

</style>