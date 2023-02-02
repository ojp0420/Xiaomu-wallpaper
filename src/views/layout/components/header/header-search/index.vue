<!-- 年/月/日/时/分：2022/6/7/23/24 -->
<!-- IDE名称：WebStorm -->
<!-- 开发系统：Windows11 -->
<!-- 作者：JinPeng -->

<template>
  <div class="w-full">
    <m-search v-model="inputValue" @search="search">
      <template #dropdown>
        <HintVue :searchText="inputValue" @itemClick="itemClick"/>
        <History :searchText="inputValue" @itemClick="itemClick"/>
        <Theme v-if="!inputValue" @itemClick="itemClick"></Theme>
      </template>
    </m-search>
  </div>
</template>

<script setup>
import {ref} from "vue";
import HintVue from "./hint.vue"
import History from "./history.vue"
import Theme from "./theme.vue"
import {useStore} from "vuex";

const store = useStore()

const inputValue = ref("")
const itemClick = (item) => {
  inputValue.value = item
  search(inputValue)
}

const search = (str) => {
  store.commit("searchHistory/addHistoryDate", str.value) // 本次搜索将储存为历史搜索
  store.commit("app/changeSearchText", str.value)
}
</script>
