<!-- 年/月/日/时/分：2022/6/7/23/24 -->
<!-- IDE名称：WebStorm -->
<!-- 开发系统：Windows11 -->
<!-- 作者：JinPeng -->

<template>
  <m-popover placement="bottom-left">
    <template #reference>
      <m-svg-icon :name="svgIconName "
                  class="guide-theme w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60  dark:hover:bg-zinc-900"
                  fillClass="fill-zinc-900 dark:fill-zinc-300"/>
    </template>

    <div class="w-[140px] overflow-hidden">
      <div class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
           v-for="(item,index) in themeArr"
           :key="item.id"
           @click="onItemClick(item.type)"
      >
        <m-svg-icon :name="item.icon" class="w-1.5 h-1.5 mr-1" fillClass="fill-zinc-900 dark:fill-zinc-300"/>
        <span class="text-zinc-800 text-sm dark:text-zinc-300">{{ item.name }}</span>
      </div>
    </div>
  </m-popover>
</template>

<script setup>
import {THEME_DARK, THEME_LIGHT, THEME_SYSTEM} from '@/constants'
import {useStore} from "vuex";
import {computed, ref} from "vue";
// 构建渲染数据
const themeArr = [
  {
    id: '0',
    type: THEME_LIGHT,
    icon: 'theme-light',
    name: '极简白'
  },
  {
    id: '1',
    type: THEME_DARK,
    icon: 'theme-dark',
    name: '极夜黑'
  },
  {
    id: '2',
    type: THEME_SYSTEM,
    icon: 'theme-system',
    name: '跟随系统'
  }
]

const store = useStore()
const onItemClick = (themeType) => store.commit("theme/changeThemeType", themeType)

// 根据当前的themeType返回当前选中的icon
const svgIconName = computed(() => themeArr.find(theme => theme.type == store.getters.themeType).icon)
</script>

<style scoped>

</style>