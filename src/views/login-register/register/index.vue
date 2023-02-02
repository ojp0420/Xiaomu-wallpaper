<!-- 年/月/日/时/分：2022/6/14/22/48 -->
<!-- IDE名称：WebStorm -->
<!-- 开发系统：Windows11 -->
<!-- 作者：JinPeng -->

<template>
  <div class="relative h-screen bg-white dark:bg-zinc-800 text-center xl:bg-zinc">
    <!--头部图标PC端-->
    <!-- <div class="hidden pt-5 h-8 xl:block">
      <img v-lazy class="m-auto" src="https://res.lgdsunday.club/signlogo.png" alt=""/>
    </div> -->
    <!-- 表单区 -->
    <div
        class="block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:py-4 xl:rounded-sm xl:shadow-lg">
      <h3 class="mb-2 font-semibold text-base text-main dark:text-zinc-300 hidden xl:block">
        注册账号
      </h3>
      <!-- 表单 -->
      <vee-form @submit="onRegister">
        <!-- 用户名 -->
        <vee-field
            class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
            name="username"
            type="text"
            placeholder="用户名"
            autocomplete="on"
            :rules="validateUsername"
            v-model="variable.userInfo.username"
        />
        <vee-error-message class="text-sm text-red-600 block mt-0.5 text-left" name="username"/>
        <!-- 密码 -->
        <vee-field
            class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
            name="password"
            type="password"
            placeholder="密码"
            autocomplete="on"
            :rules="validatePassword"
            v-model="variable.userInfo.password"
        />
        <vee-error-message class="text-sm text-red-600 block mt-0.5 text-left" name="password"/>
        <!-- 确认密码 -->
        <vee-field
            class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
            name="confirmPassword"
            type="password"
            placeholder="确认密码"
            autocomplete="on"
            rules="validateConfirmPassword:@password"
            v-model="variable.userInfo.confirmPassword"
        />
        <vee-error-message class="text-sm text-red-600 block mt-0.5 text-left" name="confirmPassword"/>

        <div class="pt-1 pb-3 leading-[0px] text-right">
          <div class="mb-2">
            <a class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-400 cursor-pointer"
               target="__black" @click="onToLogin">
              去登录
            </a>
          </div>
          <!-- <div class="text-center">
            <a class="text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-400"
               href="https://m.imooc.com/newfaq?id=89" target="__black">
              注册即同意《慕课网注册协议》
            </a>
          </div> -->
        </div>
        <m-button :loading="variable.loading" class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800">
          立即注册
        </m-button>
      </vee-form>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {validateUsername, validatePassword, validateConfirmPassword} from "../validate.js"
import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage as VeeErrorMessage,
  defineRule
} from 'vee-validate'
import {reactive} from "vue";
import {useStore} from "vuex";
import {message} from "../../../libs";

const store = useStore()
const router = useRouter()
const variable = reactive({
  userInfo: {username: "", password: "", confirmPassword: ""},
  loading: false
})
defineRule('validateConfirmPassword', validateConfirmPassword)

const onRegister = () => {
  variable.loading = true
  try {
    store.dispatch("userInfo/userRegister", variable.userInfo).then(() => {
      message("success", "注册成功 3秒后自动跳转登录界面")
      setTimeout(() => onToLogin(), 3000)
    }, (err) => {
      message("warn", err)
    })
  } finally {
    variable.loading = false
  }

}

const onToLogin = () => {
  store.commit("app/changeRouterType", "push")
  router.push("/login")
}
</script>
