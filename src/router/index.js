/*
    年/月/日/时/分：2022/6/4/16/31 -->
    IDE名称：WebStorm -->
    开发系统：Windows11 -->
    作者：JinPeng -->
*/
import {createRouter, createWebHistory} from "vue-router";
import {isMobileTerminal} from "../utils/flexible";
import mobileRoutes from "./modules/mobile-routes";
import pcRoutes from "./modules/pc-routes";

//创建vueRouter 实例
export default createRouter({
    history: createWebHistory(),
    routes: isMobileTerminal.value ? mobileRoutes : pcRoutes
})