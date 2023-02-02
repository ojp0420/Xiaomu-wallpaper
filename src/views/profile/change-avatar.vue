<!-- 年/月/日/时/分：2022/6/16/15/51 -->
<!-- IDE名称：WebStorm -->
<!-- 开发系统：Windows11 -->
<!-- 作者：JinPeng -->

<template>
  <div class="overflow-auto flex flex-col items-center">
    <m-svg-icon
        v-if="isMobileTerminal"
        name="close"
        class="w-3 h-3 p-0.5 m-1 ml-auto"
        fillClass="fill-zinc-900 dark:fill-zinc-200 "
        @click="close"
    />

    <img class="" ref="imageTarget" :src="blob"/>

    <m-button class="mt-4 w-[80%] xl:w-1/2" @click="onConfirmClick" :loading="loading">确定</m-button>
  </div>
</template>


<script>
const EMITS_CLOSE = "close"
</script>

<script setup>
import {isMobileTerminal} from "../../utils/flexible";
import {onMounted, ref} from "vue";
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'


const props = defineProps({
  blob: {
    type: String,
    required: true,
  }
})

const emits = defineEmits(['EMITS_CLOSE'])
const imageTarget = ref(null)
const loading = ref(false)

/*确定按钮点击事件*/
const onConfirmClick = () => {
  loading.value = true
  /*获取裁剪后的图片*/
  cropper.getCroppedCanvas().toBlob((blob) => {
    // 裁剪后的 blob 地址
    console.log(URL.createObjectURL(blob))
  })
}

/*关闭事件*/
const close = () => emits(EMITS_CLOSE)


// 裁剪图片 移动端配置对象
const mobileOptions = {
  // 将裁剪框限制在画布的大小
  viewMode: 1,
  // 移动画布，裁剪框不动
  dragMode: 'move',
  // 裁剪框固定纵横比：1:1
  aspectRatio: 1,
  // 裁剪框不可移动
  cropBoxMovable: false,
  // 不可调整裁剪框大小
  cropBoxResizable: false
}

// PC 端配置对象
const pcOptions = {
  // 裁剪框固定纵横比：1:1
  aspectRatio: 1
}

/**
 * 图片裁剪处理
 */
let cropper = null
onMounted(() => {
  /**
   * 接收两个参数：
   * 1. 需要裁剪的图片 DOM
   * 2. options 配置对象
   */
  cropper = new Cropper(
      imageTarget.value,
      isMobileTerminal.value ? mobileOptions : pcOptions
  )
})


</script>

<style scoped>

</style>