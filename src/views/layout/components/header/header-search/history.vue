<!-- 年/月/日/时/分：2022/6/13/11/29 -->
<!-- IDE名称：WebStorm -->
<!-- 开发系统：Windows11 -->
<!-- 作者：JinPeng -->

<template>
  <div class="" v-if="!searchText">
    <div class="flex items-center text-xs mb-1 text-zinc-400">
      <span>最近搜索</span>
      <m-svg-icon
          name="delete"
          class="w-2.5 h-2.5 ml-1 p-0.5 cursor-pointer duration-300 rounded-sm hover:bg-zinc-100"
          fillClass="fill-zinc-400"
          @click="onEmptyClick"
      />
    </div>
    <div class="flex flex-wrap">
      <div
          v-for="(item,index) in $store.getters.searchHistory"
          :key="item"
          class="mr-2 mb-1.5 flex items-center cursor-pointer bg-zinc-100 px-1.5 py-0.5 text-zinc-900 text-sm font-bold rounded-sm duration-300 hover:bg-zinc-200"
          @click="onItemClick(item)"
      >
        <span>{{ item }}</span>
        <m-svg-icon
            name="input-delete"
            class="w-2.5 h-2.5 p-0.5 ml-1 duration-300 rounded-sm hover:bg-zinc-100"
            @click.stop="onDelClick(index)"
        />
      </div>
    </div>
  </div>
</template>
<script>
const EMITS_ITEM_CLICK = 'itemClick'
</script>
<script setup>
import {useStore} from "vuex";
import {confirm} from "@/libs";

const props = defineProps({
  searchText: {type: String, required: true}
})
const emits = defineEmits([EMITS_ITEM_CLICK])
const store = useStore()

const onEmptyClick = () => confirm("要删除所有历史记录吗").then(() => store.commit("searchHistory/emptyHistoryDate"))
const onDelClick = (index) => store.commit("searchHistory/delHistoryDate", index)// 删除单个历史记录
const onItemClick = (item) => emits(EMITS_ITEM_CLICK, item) // 点击触发搜索事件

</script>

<style scoped>

</style>