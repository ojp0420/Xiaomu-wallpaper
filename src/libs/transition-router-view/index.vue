<!-- 年/月/日/时/分：2022/6/17/14/25 -->
<!-- IDE名称：WebStorm -->
<!-- 开发系统：Windows11 -->
<!-- 作者：JinPeng -->

<template>
  <!-- 路由出口 -->
  <router-view v-slot="{ Component ,route}">
    <!-- 动画组件 -->
    <transition :name="transitionName" @before-enter="beforeEnter" @after-leave="afterLeave">
      <!-- 缓存组件-->
      <keep-alive :include="virtualTaskStack">
        <component :is="Component" :class="{ 'fixed top-0 left-0 w-screen z-50': isAnimation }" :key="$route.fullPath"/>
      </keep-alive>
    </transition>
  </router-view>
</template>

<script>
const NONE = "none"
const ROUTER_TYPE_PUSH = "push"
const ROUTER_TYPE_BACK = 'back'
const ROUTER_TYPE_ENUM = [NONE, ROUTER_TYPE_PUSH, ROUTER_TYPE_BACK]
</script>

<script setup>
import {useRouter} from "vue-router";
import {ref} from "vue";

const props = defineProps({
  /*路由跳转的类型*/
  routerType: {
    type: String,
    default: NONE,
    validator(val) {
      const result = ROUTER_TYPE_ENUM.includes(val)
      if (!result) throw new Error(`你的 routerType 必须是 ${ROUTER_TYPE_ENUM.join('、')} 中的一个`)
      return result
    }
  },
  mainComponentName: {type: String, required: true} /*首页组件的名称、对应任务栈中的第一个组件*/
})

const router = useRouter()


// 任务栈
const virtualTaskStack = ref([props.mainComponentName])
//路由跳转动画
const transitionName = ref("")
/*设置前置路由守卫 在组件进来前 判断开发者 设置的路由过渡动画并进行设置*/
router.beforeEach((to, from) => {
  transitionName.value = props.routerType

  if (props.routerType === ROUTER_TYPE_PUSH) {
    // 入栈
    virtualTaskStack.value.push(to.name)
  } else if (props.routerType === ROUTER_TYPE_BACK) {
    // 出栈
    virtualTaskStack.value.pop()
  }

  // 进入首页默认清空栈
  if (to.name === props.mainComponentName) virtualTaskStack.value = [props.mainComponentName]

})

// 处理动画状态变化
const isAnimation = ref(false)
const beforeEnter = () => isAnimation.value = true

const afterLeave = () => isAnimation.value = false


</script>
<style lang="scss" scoped>
// push页面时：新页面的进入动画
.push-enter-active {
  animation-name: push-in;
  animation-duration: 0.4s;
}

// push页面时：老页面的退出动画
.push-leave-active {
  animation-name: push-out;
  animation-duration: 0.4s;
}

// push页面时：新页面的进入动画
@keyframes push-in {
  0% {
    transform: translate(100%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}

// push页面时：老页面的退出动画
@keyframes push-out {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-50%, 0);
  }
}

// 后退页面时：即将展示的页面动画
.back-enter-active {
  animation-name: back-in;
  animation-duration: 0.4s;
}

// 后退页面时：后退的页面执行的动画
.back-leave-active {
  animation-name: back-out;
  animation-duration: 0.4s;
}

// 后退页面时：即将展示的页面动画
@keyframes back-in {
  0% {
    width: 100%;
    transform: translate(-100%, 0);
  }
  100% {
    width: 100%;
    transform: translate(0, 0);
  }
}

// 后退页面时：后退的页面执行的动画
@keyframes back-out {
  0% {
    width: 100%;
    transform: translate(0, 0);
  }
  100% {
    width: 100%;
    transform: translate(50%, 0);
  }
}
</style>
