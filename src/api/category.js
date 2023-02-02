/*
    年/月/日/时/分：2022/6/5/16/18 -->
    IDE名称：WebStorm -->
    开发系统：Windows11 -->
    作者：JinPeng -->
*/
import request from "../utils/request";
// 获取分类列表
export const getCategory = () => request({url: '/category', method: 'get'})
