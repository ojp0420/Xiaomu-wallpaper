<!-- 年/月/日/时/分：2022/6/10/11/32 -->
<!-- IDE名称：WebStorm -->
<!-- 开发系统：Windows11 -->
<!-- 作者：JinPeng -->

<template>
  <m-infinite v-model="isLoading" :isFinished="isFinished" @onLoad="getPexelsData">
    <m-waterfull
        :data="pexelsList"
        nodeKey="id"
        :column="isMobileTerminal?2:5"
        :picturePreReading=true
        class="px-1 w-full"
    >
      <template v-slot="{item,width}">
        <ItemVue :data="item" :width="width" @onToPinsClick="onToPinsClick"/>
      </template>
    </m-waterfull>
  </m-infinite>
  <!-- 大图详情处理 -->
  <transition :css="false" @before-enter="beforeEnter" @enter="enter" @leave="leave">
    <PinsVue v-if="isVisiblePins" :id="currentPins.id"/>
  </transition>


</template>

<script setup>
import ItemVue from "./item/index.vue"
import {useStore} from "vuex";
import {computed, onMounted, ref, watch,} from "vue";
import {isMobileTerminal} from "@/utils/flexible";
import PinsVue from "@/views/pins/components/pins.vue"
import {gsap} from "gsap";
import {useEventListener} from "@vueuse/core/index";

let query = {page: 1, size: 20}

const store = useStore()
const isLoading = ref(false) // 数据是否加载中
const isFinished = ref(false) // 数据是否全部加载完成
/* 获取数据*/
const getPexelsData = async () => {
  // 数据全部加载完成则 return
  if (isFinished.value) return
  // 完成第一次请求之后，后续请求让 page 自增
  if (pexelsList.value.length) query.page += 1
  // 判断数据是否全部加载完成
  if (store.getters.total === store.getters.pexelsData.length) isFinished.value = true
  // 触发接口请求
  await store.dispatch("pexels/reqPexels", query)
  // 修改 loading 标记
  isLoading.value = false
}
const pexelsList = computed(() => JSON.stringify(store.getters.pexelsData) === "[]" ? [] : store.getters.pexelsData)

// 重置参数 发起请求
const resetQuery = (newQuery) => {
  query = {...query, ...newQuery}
  // 重置处理
  isFinished.value = false
  store.commit("pexels/CHANGEPEXELSDATA")
}

watch(
    () => store.getters.currentCategory,
    (currentCategory) => resetQuery({page: 1, categoryId: currentCategory.id})
)

watch(
    () => store.getters.searchText,
    (val) => resetQuery({page: 1, searchText: val})
)

const isVisiblePins = ref(false) // 控制pins是否展示
const currentPins = ref({})
/*进入pins*/
const onToPinsClick = (item) => {
  history.pushState(null, null, `/pins/${item.id}`)
  currentPins.value = item
  isVisiblePins.value = true
}

const beforeEnter = (el) => {
  gsap.set(el, {
    scaleX: 0,
    scaleY: 0,
    transformOrigin: '0 0',
    translateX: currentPins.value.localtion?.translateX,
    translateY: currentPins.value.localtion?.translateY,
    opacity: 0
  })
}
const enter = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    translateX: 0,
    translateY: 0,
    onComplete: done
  })
}
const leave = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 0,
    scaleY: 0,
    x: currentPins.value.localtion?.translateX,
    y: currentPins.value.localtion?.translateY,
    opacity: 0
  })
}

/**监听浏览器后退按钮事件*/
useEventListener(window, 'popstate', () => {
  isVisiblePins.value = false
})


</script>