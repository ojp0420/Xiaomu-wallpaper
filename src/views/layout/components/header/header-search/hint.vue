<!-- 年/月/日/时/分：2022/6/13/10/09 -->
<!-- IDE名称：WebStorm -->
<!-- 开发系统：Windows11 -->
<!-- 作者：JinPeng -->

<template>
  <div class="" v-if="searchText">
    <div v-for="(item,index) in hintDate"
         :key="index"
         class="py-1 pl-1 text-base font-bold text-zinc-500 rounded cursor-pointer duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-900"
         @click="onItemClick(item)"
         v-html="highlightText(item)"
    >
    </div>
  </div>
</template>
<script>
const EMITS_ITEM_CLICK = "itemClick"
</script>

<script setup>
import {getHint} from "@/api/pexels"
import {ref, watch} from "vue";
import {watchDebounced} from "@vueuse/core"

const props = defineProps({
  searchText: {type: String, required: true}
})

const emits = defineEmits([EMITS_ITEM_CLICK])

const hintDate = ref([])

const getHintDate = async () => {
  if (!props.searchText) return
  const {result} = await getHint(props.searchText)
  hintDate.value = result
}

/*监听搜索文本的变化，并获取对应的提示数据 加入防抖*/
watchDebounced(() => props.searchText, (val) => getHintDate(), {immediate: true, debounce: 500})
/*item点击事件处理*/
const onItemClick = item => emits(EMITS_ITEM_CLICK, item)

/*处理搜索关键字高亮显示*/
const highlightText = (text) => {
  //  生成高亮标签
  const highlightStr = `<span class="text-zinc-900 dark:text-zinc-200">${props.searchText}</span>`
  // 构建正则表达式，从《显示文本中》找出与《用户输入文本相同的内容》，使用《高亮标签》进行替换
  const reg = new RegExp(props.searchText, 'gi')
  // 替换
  return text.replace(reg, highlightStr)
}
</script>
