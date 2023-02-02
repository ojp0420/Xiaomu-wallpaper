<!-- 年/月/日/时/分：2022/6/18/00/04 -->
<!-- IDE名称：WebStorm -->
<!-- 开发系统：Windows11 -->
<!-- 作者：JinPeng -->

<template>
  <div>
    <!-- PC 端支付 -->
    <PcPaymentVue v-if="!isMobileTerminal"></PcPaymentVue>
    <!-- 移动端支付 -->
    <MobilePaymentVue v-else></MobilePaymentVue>
  </div>
</template>

<script setup>
import {isMobileTerminal} from '@/utils/flexible'
import PcPaymentVue from './pc-payment/index.vue'
import MobilePaymentVue from './mobile-payment/index.vue'
</script>
