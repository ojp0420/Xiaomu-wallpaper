<!-- 年/月/日/时/分：2022/6/17/22/48 -->
<!-- IDE名称：WebStorm -->
<!-- 开发系统：Windows11 -->
<!-- 作者：JinPeng -->

<template>
  <div class="h-full bg-zinc-200 dark:bg-zinc-800 duration-400 xl:pt-1">
    <div
        class="max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-400 xl:rounded-sm xl:border-zinc-200 xl:dark:border-zinc-600 xl:border-[1px] xl:px-4"
    >
      <!-- 移动端 navbar 处理 -->
      <m-navbar v-if="isMobileTerminal" sticky :clickLeft="onNavbarLeftClick">精选会员</m-navbar>

      <div class="py-2 px-1">
        <h2 class="text-center text-[34px] font-bold tracking-widest text-yellow-600">精选VIP</h2>
        <p class="text-center text-lg text-yellow-500">升级精选VIP，畅想所有内容</p>
        <div
            class="flex justify-between mt-5 overflow-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent"
        >
          <PayMenuItemVue
              v-if="vipPayListData.length !==0"
              v-for="item in vipPayListData"
              :key="item.id"
              :hot="item.isHot"
              :select="item.id === currentPayData.id"
              :data="item"
              @click="onChangeCurrentPay(item)"
          />
          <m-svg-icon v-else class="w-4 h-4 mx-auto animate-spin" name="infinite-load"/>

        </div>


        <p class="mt-1 text-sm text-zinc-500">{{ currentPayData.desc }}</p>
        <!-- 支付 -->
        <PaymentVue></PaymentVue>
      </div>
    </div>
  </div>
</template>
<script setup>
import {isMobileTerminal} from "../../utils/flexible";
import {getVipPayList} from "../../api/apy";
import {ref} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import PayMenuItemVue from "./components/pay-menu-item.vue"
import PaymentVue from "./components/payment/index.vue"

const store = useStore()
const router = useRouter()

const onNavbarLeftClick = () => {
  store.commit("app/changeRouterType", "back")
  router.back()
}
const currentPayData = ref({})
const onChangeCurrentPay = (item) => currentPayData.value = item

const vipPayListData = ref([])
getVipPayList().then(response => vipPayListData.value = response)
</script>
