<!-- 年/月/日/时/分：2022/6/7/21/59 -->
<!-- IDE名称：WebStorm -->
<!-- 开发系统：Windows11 -->
<!-- 作者：JinPeng -->

<template>
  <div class="py-2 h-[80vh] flex flex-col">
    <h2 class="text-xl text-zinc-900  font-bold mb-2 px-1 dark:text-zinc-200">所有分类</h2>
    <ul class="overflow-y-scroll">
      <li v-for="(item,index) in $store.getters.categorys" :key="item.id"
          class="text-lg text-zinc-900 px-1 py-1.5 duration-100 active:bg-zinc-100 dark:text-zinc-300 active:dark:bg-zinc-900"
          @click="$emit('onItemClick',item)">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>

</script>

<style scoped>

</style>