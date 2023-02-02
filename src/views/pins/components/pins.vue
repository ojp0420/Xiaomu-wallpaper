<!-- 年/月/日/时/分：2022/6/14/14/15 -->
<!-- IDE名称：WebStorm -->
<!-- 开发系统：Windows11 -->
<!-- 作者：JinPeng -->

<template>
  <div class="fixed left-0 top-0 w-screen h-screen z-20 backdrop-blur-4xl bg-transparent pb-2 overflow-y-auto xl:p-2">
    <!--移动端下展示 navbar-->
    <m-navbar v-if="isMobileTerminal" :clickLeft="clickLeft" :clickRight="clickRight">
      {{ pexelDate.title }}
      <template #right>
        <m-svg-icon name="share" class="w-3 h-3" fillClass="fill-zinc-900 dark:fill-zinc-200"/>
      </template>
    </m-navbar>
    <!--pc端下展示关闭的图标-->
    <m-svg-icon
        v-else
        name="close"
        class="w-3 h-3 ml-1 p-0.5 cursor-pointer duration-200 rounded-sm hover:bg-zinc-100 absolute right-2 top-2"
        fillClass="fill-zinc-400"
        @click="onPop"
    />

    <!--内容区-->
    <div class="xl:w-[80%] xl:h-full xl:mx-auto xl:rounded-lg xl:flex">
      <img class="w-screen mb-2 xl:w-3/5 xl:h-full xl:rounded-tl-lg xl:rounded-bl-lg" :src="pexelDate.photo" alt="">
      <div class="xl:w-2/5 xl:h-full xl:bg-white xl:dark:bg-zinc-900 xl:rounded-tr-lg xl:rounded-br-lg xl:p-3">
        <!-- pc端下分享收藏按钮-->
        <div v-if="!isMobileTerminal" class="flex justify-between mb-2">
          <m-svg-icon name="share"
                      class="w-4 h-4 p-1 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 duration-300 rounded"
                      fillClass="fill-zinc-900 dark:fill-zinc-200"/>
          <m-button class="" type="info" icon="heart" iconClass="fill-zinc-900 dark:fill-zinc-200"/>
        </div>
        <!--标题-->
        <!-- <p class="text-base text-zinc-900 dark:text-zinc-200 ml-1 font-bold xl:text-xl xl:mb-5">
          {{ pexelDate.title }}
        </p> -->
        <!--作者-->
        <div class="flex items-center mt-1 px-1">
          <img v-lazy class="h-3 w-3 rounded-full" :src="pexelDate.avatar" alt=""/>
          <span class="text-base text-zinc-900 dark:text-zinc-200 ml-1">{{ pexelDate.author }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {getPexelsFromId} from "@/api/pexels";
import {ref} from "vue";
import {isMobileTerminal} from "@/utils/flexible";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

const store = useStore()
const router = useRouter()
const pexelDate = ref({})
const props = defineProps({
  id: {required: true}
})

/*获取详情数据*/
getPexelsFromId(props.id).then(response => pexelDate.value = response)

const clickLeft = () => {
  store.commit("app/changeRouterType", "back")
  router.back()
}
const onPop = () => {
  store.commit("app/changeRouterType", "back")
  router.back()
}
const clickRight = () => alert("分享成功！！")

</script>