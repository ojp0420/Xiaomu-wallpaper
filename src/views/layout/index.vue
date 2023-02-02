<!-- 年/月/日/时/分：2022/6/4/16/37 -->
<!-- IDE名称：WebStorm -->
<!-- 开发系统：Windows11 -->
<!-- 作者：JinPeng -->

<template>
  <div class="h-screen">
    <!-- 需要在 tailwind 中定义 h-header 高度 -->
    <HeaderVue class="h-header"/>
    <div class="h-main">
      <MainVue />
    </div>
    <FloatingVue class="fixed bottom-10 right-2"/>
  </div>
</template>

<script setup>
import FloatingVue from "./components/floating/index.vue"
import MainVue from "./components/main/index.vue"
import HeaderVue from "./components/header/index.vue"
import {} from 'vue'
</script>

<style scoped>

</style>