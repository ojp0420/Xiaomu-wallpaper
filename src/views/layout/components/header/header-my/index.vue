<!-- 年/月/日/时/分：2022/6/7/23/24 -->
<!-- IDE名称：WebStorm -->
<!-- 开发系统：Windows11 -->
<!-- 作者：JinPeng -->

<template>
  <m-popover class="flex items-center" placement="bottom-left">
    <template #reference>
      <div v-if="$store.getters.token"
           class="guide-my relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900">
        <!--头像-->
        <img
            v-lazy
            :src="$store.getters.userInfo.avatar"
            alt="touxian" class="w-3 h-3 rounded-sm">
        <!--下箭头-->
        <m-svg-icon
            class="h-1.5 w-1.5 ml-0.5"
            name="down-arrow"
            fillClass="fill-zinc-900 dark:fill-zinc-300"
        />
        <!--VIP标记-->
        <m-svg-icon
            v-if="$store.getters.userInfo.vipLevel"
            name="vip"
            class="w-1.5 h-1.5 absolute right-[16px] bottom-0"/>
      </div>
      <!--现在是默认未登录-->
      <div v-else>
        <m-button class="guide-my" icon="profile" iconColor="#FFF" @click="onToLogin"/>
      </div>
    </template>

    <div v-if="$store.getters.token" class="w-[140px] overflow-hidden">
      <div
          class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
          v-for="item in menuArr"
          :key="item.id"
          @click="onItemClick(item)"
      >
        <m-svg-icon
            :name="item.icon"
            class="w-1.5 h-1.5 mr-1"
            fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <span class="text-zinc-800 text-sm dark:text-zinc-300">{{ item.title }}</span>
      </div>
    </div>
  </m-popover>
</template>

<script setup>
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {confirm} from "@/libs";

const store = useStore()
const router = useRouter()

// 构建 menu 数据源
const menuArr = [
  {
    id: 0,
    title: '个人资料',
    icon: 'profile',
    path: '/profile'
  },
  {
    id: 1,
    title: '升级 VIP',
    icon: 'vip-profile',
    path: '/member'
  },
  {
    id: 2,
    title: '退出登录',
    icon: 'logout',
    path: ''
  }
]

/**menu Item 点击事件，也可以根据其他的 key 作为判定，比如 name*/
const onItemClick = ({path}) => {
  // 有路径则进行路径跳转
  if (path) {
    router.push(path)
    return
  }
  // 无路径则为退出登录
  confirm('您确定要退出登录吗？').then(() => {
    // 退出登录不存在跳转路径
    store.dispatch("userInfo/logout")
  })
}


const onToLogin = () => {
  store.commit("app/changeRouterType","push")
  router.push("/login")
}
</script>
