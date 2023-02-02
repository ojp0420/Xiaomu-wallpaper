/*
    年/月/日/时/分：2022/6/4/16/33 -->
    IDE名称：WebStorm -->
    开发系统：Windows11 -->
    作者：JinPeng -->
*/
//全局状态访问处理

import {isMobileTerminal} from "../utils/flexible";

export default {
    categorys: (state) => state.category.Categorys, // 导航分类数据
    themeType: (state) => state.theme.themeType, // 系统样式
    pexelsData: (state) => state.pexels.PexelsData, // 瀑布流数据
    total: state => state.pexels.total, // 瀑布流总数据量
    currentCategory: (state) => state.app.currentCategory, // category选中项
    currentCategoryIndex: (state, getters) => getters.categorys.findIndex(item => item.id === getters.currentCategory.id), // category选中项下标
    searchHistory: (state) => state.searchHistory.historyDate,// 搜索历史
    searchText: (state) => state.app.searchText, // 搜索文本
    token: (state) => state.userInfo.token,
    userInfo: (state) => state.userInfo.userInfo,
    routerType: (state) => {
        // 在 PC 端下，永远为 none
        if (!isMobileTerminal.value) {
            return 'none'
        }
        return state.app.routerType
    }
}



