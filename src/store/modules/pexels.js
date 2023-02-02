/*
    年/月/日/时/分：2022/6/10/11/42 -->
    IDE名称：WebStorm -->
    开发系统：Windows11 -->
    作者：JinPeng -->
*/

import {reqPexels} from "@/api/pexels";

export default {
    namespaced: true,
    actions: {
        reqPexels: async (context, data) => {
            const PexelsData = await reqPexels(data)
            context.commit("PEXELSDATA", {PexelsData: PexelsData.list, total: PexelsData.total})
        }
    },
    mutations: {
        PEXELSDATA: (state, {PexelsData, total}) => {
            state.total = total
            state.PexelsData = [...state.PexelsData, ...PexelsData]
        },

        CHANGEPEXELSDATA: (state) => state.PexelsData = []
    },
    state: {
        total: null,
        PexelsData: []
    },
}