/*
    年/月/日/时/分：2022/6/17/22/54 -->
    IDE名称：WebStorm -->
    开发系统：Windows11 -->
    作者：JinPeng -->
*/

import request from "../utils/request";

/*获取VIP支付数据*/
export const getVipPayList = () => request({url: '/user/vip/pay/list', method: "get"})