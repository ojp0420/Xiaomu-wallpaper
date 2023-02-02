/*
    年/月/日/时/分：2022/6/12/17/04 -->
    IDE名称：WebStorm -->
    开发系统：Windows11 -->
    作者：JinPeng -->
*/
import {ALL_CATEGORY_ITEM} from "../../constants";

export default {
    namespaced: true,
    action: {},
    mutations: {
        changeCurrentCategory: (state, newCategory) => state.currentCategory = newCategory,
        changeSearchText: (state, newSearchText) => state.searchText = newSearchText,
        changeRouterType: (state, newRouterType) => state.routerType = newRouterType,
    },
    state: {
        currentCategory: ALL_CATEGORY_ITEM, // 当前选中的分类
        searchText: "", // 搜索文本
        routerType: 'none', // 路由跳转类型 默认为空
    },
}