<!-- 年/月/日/时/分：2022/6/5/15/02 -->
<!-- IDE名称：WebStorm -->
<!-- 开发系统：Windows11 -->
<!-- 作者：JinPeng -->

<template>
  <MobileNavigationVue v-if="isMobileTerminal"/>
  <PcNaviGationVue v-else></PcNaviGationVue>

</template>

<script setup>
import {isMobileTerminal} from "../../../../utils/flexible";
import MobileNavigationVue from './mobile/index.vue'
import PcNaviGationVue from "./pc/index.vue"
import {useStore} from "vuex"
import {onMounted} from "vue";

const store = useStore() // 实例化store
onMounted(() => store.dispatch('category/reqCategory'))
</script>

<style scoped>

</style>