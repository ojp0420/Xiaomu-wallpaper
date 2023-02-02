/*
    年/月/日/时/分：2022/6/10/11/27 -->
    IDE名称：WebStorm -->
    开发系统：Windows11 -->
    作者：JinPeng -->
*/
/*
* 获取图片信息数据
* */
import request from "../utils/request";

export const reqPexels = (data) => request({url: `/pexels/list`, method: "get", params: data}) // 图片数据

export const getHint = (q) => request({url: "/pexels/hint", params: {q}}) // 搜索提示

export const getThemes = () => request({url: "/pexels/themes"}) // 获取推荐主题

export const getPexelsFromId = (id) => request({url: `/pexels/${id}`})