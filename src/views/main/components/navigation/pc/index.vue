<!-- 年/月/日/时/分：2022/6/5/15/01 -->
<!-- IDE名称：WebStorm -->
<!-- 开发系统：Windows11 -->
<!-- 作者：JinPeng -->

<template>
  <div class="bg-white sticky top-0 left-0 w-full z-10 dark:bg-zinc-800">
    <ul class="w-[800px] relative flex flex-wrap justify-center overflow-x-auto px-[10px] py-1 text-xs text-zinc-600 duration-300 overflow-hidden mx-auto"
        :class="[isOpenCategoty?'h-[206px]':'h-[56px]']"
    >
      <!-- lg 下展开箭头 -->
      <div
          class="absolute right-1 bottom-1 z-20 p-1 rounded cursor-pointer duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-900"
          @click="triggerState">
        <m-svg-icon
            :name="isOpenCategoty?'fold':'unfold'"
            class="w-1 h-1"
            fillClass="fill-zinc-900 dark:fill-zinc-300"
        />
      </div>
      <!-- category item -->
      <li
          v-for="(item,index) in $store.getters.categorys"
          :key="item.id"
          :class="{'text-zinc-900 bg-zinc-200 dark:text-zinc-300 dark:bg-zinc-900 ': $store.getters.currentCategoryIndex === index}"
          class="dark:text-zinc-500 dark:hover:text-zinc-300 dark:hover:bg-zinc-900 shrink-0 px-1.5 py-0 z-10 duration-200 last:mr-4 text-zinc-900 text-base font-bold h-4 leading-4 cursor-pointer hover:bg-zinc-200 rounded mr-1 mb-1"
          @click="onItemClick(item)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useStore} from "vuex";

const store = useStore()

// 管理导航栏是否展开
const isOpenCategoty = ref(false)
// 所选中的标签
const currentCategoryIndex = ref(0)
const triggerState = () => isOpenCategoty.value = !isOpenCategoty.value
const onItemClick = (item) => store.commit("app/changeCurrentCategory", item)

</script>

<style scoped>

</style>