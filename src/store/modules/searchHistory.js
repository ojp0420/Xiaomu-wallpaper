/*
    年/月/日/时/分：2022/6/13/11/15 -->
    IDE名称：WebStorm -->
    开发系统：Windows11 -->
    作者：JinPeng -->
*/

export default {
    namespaced: true,
    actions: {},
    mutations: {
        // 插入
        addHistoryDate: (state, newitem) => {
            /*插入的数据不能有重复的 所以插入时 要先将旧数据剔除*/
            const oldIndex = state.historyDate.findIndex(olditem => olditem === newitem)
            if (oldIndex !== -1) state.historyDate.splice(oldIndex, 1)
            state.historyDate.unshift(newitem)
        },
        // 删除单个
        delHistoryDate: (state, index) => state.historyDate.splice(index, 1),
        // 清空
        emptyHistoryDate: (state) => state.historyDate = []
    },
    state: {
        historyDate: []
    },
}