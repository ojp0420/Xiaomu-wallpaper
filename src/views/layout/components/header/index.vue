<!-- 年/月/日/时/分：2022/6/7/23/05 -->
<!-- IDE名称：WebStorm -->
<!-- 开发系统：Windows11 -->
<!-- 作者：JinPeng -->

<template>
  <div class="w-full bg-white border-b border-b-zinc-200 px-2 py-1 dark:bg-zinc-800  dark:border-b-zinc-700">
    <div class="flex items-center ">
      <img
          v-lazy
          class="h-4 cursor-pointer mr-2 guide-home"
          src="https://img2.baidu.com/it/u=3971822744,688613491&fm=253&fmt=auto&app=138&f=PNG?w=330&h=252"
          @click="onToHome"
          alt="Logo"
      />
      <SearchVue class="mr-1 guide-search"/>
      <ThemeVue class="mr-1"/>
      <UserVue></UserVue>
    </div>
  </div>
</template>

<script setup>
import SearchVue from "./header-search/index.vue"
import ThemeVue from "./header-theme/idnex.vue"
import UserVue from "./header-my/index.vue"
import {useRouter} from "vue-router"
// 实例化一个路由器
const router = useRouter()

const onToHome = () => {
  router.push("/")
}


</script>

<style scoped>

</style>