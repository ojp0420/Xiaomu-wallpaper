<!-- 年/月/日/时/分：2022/6/13/20/44 -->
<!-- IDE名称：WebStorm -->
<!-- 开发系统：Windows11 -->
<!-- 作者：JinPeng -->

<template>
  <div class="">
    <div class="text-xs mb-1 text-zinc-400">热门精选</div>
    <div class="flex h-[140px]" v-if="variable.imgList.length">
      <div class="relative rounded w-[260px] cursor-pointer" :style="{ backgroundColor: randomRGB()}"
           @click="onSearchItem(variable.bigImg.title)">
        <img class="h-full w-full object-cover rounded" v-lazy :src="variable.bigImg.photo" alt=""/>
        <p class="absolute bottom-0 left-0 w-full h-[45%] flex items-center backdrop-blur rounded px-1 text-white text-xs duration-300 hover:backdrop-blur-none">
          # {{ variable.bigImg.title }}</p>
      </div>
      <div class="flex flex-wrap flex-1 max-w-[860px]">
        <div v-for="item in variable.imgList" :key="item.id"
             class="h-[45%] w-[260px] text-white text-xs relative ml-1.5 mb-1.5 rounded"
             :style="{backgroundColor: randomRGB()}" @click="onSearchItem(item.title)">
          <img class="w-full h-full object-cover rounded" v-lazy :src="item.photo"/>
          <p class="backdrop-blur absolute top-0 left-0 w-full h-full flex items-center px-1 rounded cursor-pointer duration-300 hover:backdrop-blur-none">
            # {{ item.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {randomRGB} from "@/utils/color";
import {getThemes} from "@/api/pexels";
import {reactive} from "vue";
import {useVModel} from "@vueuse/core";

const variable = reactive({
  bigImg: {},
  imgList: []
})


const emits = defineEmits(["itemClick"])


const onSearchItem = (str) => emits("itemClick", str)


/*获取推荐列表数据*/
getThemes().then(response => {
  const {themes} = response
  variable.bigImg = themes[0]
  variable.imgList = themes.slice(1, themes.length)
})
</script>