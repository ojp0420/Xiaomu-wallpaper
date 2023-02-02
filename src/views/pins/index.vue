<!-- 年/月/日/时/分：2022/6/14/14/15 -->
<!-- IDE名称：WebStorm -->
<!-- 开发系统：Windows11 -->
<!-- 作者：JinPeng -->

<template>
  <div class="w-full h-full bg-zinc-200 dark:bg-zinc-800">
    <PinsVue :id="$route.params.id"/>
  </div>
</template>

<script setup>
import PinsVue from './components/pins.vue'
</script>

