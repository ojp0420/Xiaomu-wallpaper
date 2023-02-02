/*
    年/月/日/时/分：2022/6/17/23/57 -->
    IDE名称：WebStorm -->
    开发系统：Windows11 -->
    作者：JinPeng -->
*/
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import duration from 'dayjs/plugin/duration'

// 中文
dayjs.locale('zh')
// duration 插件
dayjs.extend(duration)

export default dayjs
