<!-- 年/月/日/时/分：2022/6/18/14/10 -->
<!-- IDE名称：WebStorm -->
<!-- 开发系统：Windows11 -->
<!-- 作者：JinPeng -->

<template>
  <div
      class="flex justify-center items-center py-0.5 bg-orange-100 border-orange-300 border-t xl:border xl:rounded-sm"
      v-if="!isCountDownFinish"
  >
    <m-svg-icon
        name="countdown"
        class="w-1.5 h-1.5 mr-1"
        fillClass="fill-red-600"
    />
    <p class="text-xs text-red-600 font-bold">
      限时特惠 | 距离优惠结束仅剩
      <m-count-down
          :time="52 * 60 * 1000"
          class="inline-block"
          @finish="isCountDownFinish = true"
      />
    </p>
  </div>
</template>

<script setup>
import {ref} from 'vue'
// 倒计时是否结束
const isCountDownFinish = ref(false)
</script>
