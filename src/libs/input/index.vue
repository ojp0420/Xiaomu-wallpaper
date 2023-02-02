<!-- 年/月/日/时/分：2022/6/16/11/24 -->
<!-- IDE名称：WebStorm -->
<!-- 开发系统：Windows11 -->
<!-- 作者：JinPeng -->

<template>

  <div class="relative">
    <input
        v-if="type===TYPY_TEXT"
        class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400 border-[1px] outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400 w-full"
        type="text"
        v-model="text"
        :maxlength="max"
    >
    <textarea
        v-if="type===TYPE_TEXTAREA"
        class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400 border-[1px] outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400 w-full"
        type="text"
        v-model="text"
        rows="5"
        :maxlength="max"
    />

    <span v-if="max" class="absolute right-1 bottom-0.5 text-zinc-400 text-xs"
          :class="{ 'text-red-700': textNumber === parseInt(max) }"
    >
{{ textNumber }}/{{ max }}
    </span>
  </div>

</template>


<script>
export const TYPY_TEXT = "text"
export const TYPE_TEXTAREA = "textarea"
</script>

<script setup>
import {useVModel} from "@vueuse/core";
import {computed} from "vue";

const props = defineProps({
  modelValue: {type: String, required: true},
  type: {
    type: String,
    default: TYPY_TEXT,
    validate(val) {
      const arr = [TYPY_TEXT, TYPE_TEXTAREA]
      const result = arr.includes(val)
      if (!result) throw Error(`type的值必须在可选范围内[${arr.join('、')}]`)
      return result
    }
  },
  max: {type: [String, Number]}
})

const emits = defineEmits(["update:modelValue"])
const text = useVModel(props)  // 输入的字符串
const textNumber = computed(() => text.value.length)

</script>

<style scoped>

</style>