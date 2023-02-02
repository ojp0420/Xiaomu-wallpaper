<!-- 年/月/日/时/分：2022/6/17/23/42 -->
<!-- IDE名称：WebStorm -->
<!-- 开发系统：Windows11 -->
<!-- 作者：JinPeng -->

<template>
  <div>
    <slot>
      <p class="text-sm">
        {{ showTime }}
      </p>
    </slot>
  </div>
</template>

<script>
// 倒计时结束
const EMITS_FINISH = 'finish'
// 倒计时改变
const EMITS_CHANGE = 'change'
/*倒计时间隔*/
const INTERVAL_COUNT = 1000
</script>

<script setup>
import {computed, onUnmounted, ref, watch} from "vue";
import dayjs from "./utils";

const props = defineProps({
  // 毫秒
  time: {type: Number, required: true},
  // 遵循 dayjs format 标准：https://day.js.org/docs/zh-CN/parse/string-format
  format: {type: String, default: 'HH:mm:ss'}
})

const emits = defineEmits([EMITS_FINISH, EMITS_CHANGE])

/**清理倒计时*/
let interval = null
const close = () => interval && clearInterval(interval)

/*开始倒计时*/
const start = () => {
  close()
  interval = setInterval(() => durationFn(), INTERVAL_COUNT)
}

/*倒计时时长*/
const duration = ref(0)

/*倒计时行为*/
const durationFn = () => {
  duration.value -= INTERVAL_COUNT
  emits(EMITS_CHANGE)
  // 监听结束时长
  if (duration.value <= 0) {
    duration.value = 0
    emits(EMITS_FINISH)
    close()
  }
}

const showTime = computed(() => dayjs.duration(duration.value).format(props.format))


/*当数据传进来时 开始倒计时*/
watch(
    () => props.time,
    (val) => {
      duration.value = val
      start()
    },
    {
      immediate: true
    }
)
/**组件销毁时，清理倒计时*/
onUnmounted(() => close())


</script>

<style scoped>

</style>