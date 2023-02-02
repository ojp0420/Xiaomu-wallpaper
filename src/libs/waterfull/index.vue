<!-- 年/月/日/时/分：2022/6/10/18/00 -->
<!-- IDE名称：WebStorm -->
<!-- 开发系统：Windows11 -->
<!-- 作者：JinPeng -->

<template>
  <div class="relative" ref="containerTarget"
       :style="{ height: containerHeight + 'px' // 因为当前为 relative 布局，所以需要主动指定高度
}">
    <!--单个item  因为列数不确定 所以需要根据列数计算每列的宽度 所以需要等待列宽计算完成，并且有了数据源之后才能进行渲染-->
    <template v-if="columnWidth && data.length">
      <!--通过动态的style来去计算对应的列宽，和定位的偏移量，left、top-->
      <div class="m-waterfall-item absolute duration-300"
           :style="{
                    width:columnWidth +'px',
                    left: item._style?.left + 'px',
                    top: item._style?.top + 'px'}"
           v-for="(item,index) in data" :key="nodeKey?item[nodeKey]:index"
      >
        <slot :item="item" :width="columnWidth" :index="index"></slot>
      </div>
    </template>
<!--    <m-svg-icon v-else class="w-4 h-4 mx-auto animate-spin" name="infinite-load"/>-->
  </div>
</template>

<script setup>
import {ref, computed, onMounted, nextTick, watch, onUnmounted} from "vue";
import {getImgElements, getAllImg, onComplateImgs, getMinHeightColumn} from "./utils.js"

const props = defineProps({
  //数据源
  data: {
    // type: Array,
    required: true,
  },
  // 唯一标识
  nodeKey: {
    type: String
  },
  //列数
  column: {
    type: Number,
    default: 2
  },
  //列间距
  columnSpacing: {
    type: Number,
    default: 20
  },
  //行间距
  rowSpacing: {
    type: Number,
    default: 20
  },
  // 是否需要图片预加载
  picturePreReading: {
    type: true,
    default: true
  }

})

/*容器的总高度 取最高的一列为总高度*/
const containerHeight = ref(0)
//记录每列高度的容器。key：所在列 val：列高
const columnHeightObj = ref({})
/*根据开发者设置的列数 构建记录高度的对象*/
const useColumnHeightObj = () => {
  columnHeightObj.value = {} // 初始化
  for (let i = 0; i < props.column; i++) {
    columnHeightObj.value[i] = 0
  }
}

/*计算列宽 */
// 容器的实例
const containerTarget = ref(null)
// 容器总宽度(不包含 padding、margin、border)\
const containerWidth = ref(0)
// 容器左边距，计算item左边距时需要使用
const containerLeft = ref(0)
// 列宽
const columnWidth = ref(0)
/*j计算容器宽度*/
const useContainerWidth = () => {
  const {paddingLeft, paddingRight} = getComputedStyle(containerTarget.value, null)
  // 容器左边距
  containerLeft.value = parseFloat(paddingLeft)
  // 容器宽度
  containerWidth.value = containerTarget.value.offsetWidth - parseFloat(paddingLeft) - parseFloat(paddingRight)
}
// 列间距合计
const columnSpacingTotal = computed(() => (props.column - 1) * props.columnSpacing)   // 如果是5列，则存在 4 个列间距
/**开始计算列宽*/
const useColumnWidth = () => {
  // 获取容器宽度
  useContainerWidth()
  // 计算列宽
  columnWidth.value = (containerWidth.value - columnSpacingTotal.value) / props.column
}

onMounted(() => useColumnWidth())   // 计算列宽

/*需要图片预加载 监听图片加载完成 获取item的高度*/
let itemHeights = []// item高度的集合
const waitImgComplate = () => {
  itemHeights = []
  //  拿到所有元素
  let itemElements = [...document.getElementsByClassName('m-waterfall-item')]
  // 获取所有的img标签
  const imgElements = getImgElements(itemElements)
  // 获取所有的img标签下的src属性及所有的图片
  const allImgs = getAllImg(imgElements)
  onComplateImgs(allImgs).then(() => {
    itemElements.forEach(el => {
      itemHeights.push(el.offsetHeight)
    })
    //  渲染位置
    useItemLocation()
  })
}

/*不需要图片预加载 获取item的高度*/
const useItemHeight = () => {
  itemHeights = []
  // 拿到所有元素
  let itemElements = [...document.getElementsByClassName('m-waterfall-item')]
  // 依据传入数据计算出的 img 高度
  itemElements.forEach((el) => itemHeights.push(el.offsetHeight))
  // 渲染位置
  useItemLocation()
}

const getItemLeft = () => {
  // 最小高度所在的列 * (列宽 + 间距)
  const column = getMinHeightColumn(columnHeightObj.value)
  return column * (columnWidth.value + props.columnSpacing) + containerLeft.value
}
/**返回下一个 item 的 top*/
const getItemTop = () => Math.min(...Object.values(columnHeightObj.value))
/**指定列高度自增*/
const increasingHeight = (index) => {
  // 最小高度所在的列
  const minHeightColumn = getMinHeightColumn(columnHeightObj.value)
  // 该列高度自增
  // TODO 有Bug
  columnHeightObj.value[minHeightColumn] += itemHeights[index] + props.rowSpacing
}


/* 渲染每个item的位置*/
const useItemLocation = () => {
  // 遍历数据源
  props.data.forEach((item, index) => {
    // 避免重复计算
    if (item._style) return
    // 生成 _style 属性
    item._style = {}
    // left
    item._style.left = getItemLeft()
    // top
    item._style.top = getItemTop()
    // 插入图片所在列相对应的columnHeightObj高度自增
    increasingHeight(index)
  })
  //  容器高度重新赋值为最高列的高度
  containerHeight.value = Math.max(...Object.values(columnHeightObj.value))
}

// 监听数据 触发计算
watch(
    () => props.data,
    (newVal) => {
      newVal.every(item => !item._style) && useColumnHeightObj()
      nextTick(() => props.picturePreReading ? waitImgComplate() : useItemHeight())
    },
    {deep: true, immediate: true}
)

/**在组件销毁时，清除所有的 _style*/
onUnmounted(() => props.data.forEach(item => delete item._style))

// 监听列数的变化
watch(
    () => props.column,
    () => {
      // 在 picturePreReading 为 true 的前提下，需要首先为列宽滞空，列宽滞空之后，会取消瀑布流渲染
      columnWidth.value = 0
      // reset()
      location.reload()
    }
)
</script>
