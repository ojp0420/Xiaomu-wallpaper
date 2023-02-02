<!-- 年/月/日/时/分：2022/6/17/12/25 -->
<!-- IDE名称：WebStorm -->
<!-- 开发系统：Windows11 -->
<!-- 作者：JinPeng -->

<template>
  <div class="w-5 flex flex-col items-center justify-center mx-0.5" @click="onItemClick">
    <m-svg-icon :name="icon" :fillClass="iconClass" class="w-2 h-2"/>
    <p class="text-sm mt-0.5" :class="textClass">
      <slot/>
    </p>
  </div>

</template>

<script setup>
import {useRouter} from "vue-router";

const router = useRouter()


const props = defineProps({
  icon: {type: String, required: true},
  iconClass: {type: String},
  textClass: {type: String},
  to: {type: String},
})

const onItemClick = () => props.to && router.push(props.to)


</script>
