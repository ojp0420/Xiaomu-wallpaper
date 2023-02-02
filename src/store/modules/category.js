/*
    年/月/日/时/分：2022/6/9/15/47 -->
    IDE名称：WebStorm -->
    开发系统：Windows11 -->
    作者：JinPeng -->
*/

/*
* 管理导航栏数据
* */
import {getCategory} from '@/api/category'
import {ALL_CATEGORY_ITEM} from "../../constants";
import {CATEGORY_NOMAR_DATA} from "@/constants"

export default {
    namespaced: true,   //开启该模块就成为命名空间模块了 独立作用域
    actions: {
        // 获取Category数据
        reqCategory: async (context) => {
            const {categorys} = await getCategory()
            context.commit("REQCATEGORY", categorys)
        }
    },
    mutations: {
        REQCATEGORY: (state, categorys) => state.Categorys = [ALL_CATEGORY_ITEM, ...categorys]
    },
    state: {
        Categorys: CATEGORY_NOMAR_DATA,
    },
}