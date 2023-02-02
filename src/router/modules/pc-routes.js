/*
    年/月/日/时/分：2022/6/4/16/32 -->
    IDE名称：WebStorm -->
    开发系统：Windows11 -->
    作者：JinPeng -->
*/

export default [
    {
        path: '/',
        name: 'main',
        component: () => import('@/views/layout/index.vue'),
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('@/views/main/index.vue')
            },
            {
                path: '/profile',
                name: 'profile',
                component: () => import('@/views/profile/index.vue'),
                meta: {
                    user: true // 是否需要鉴权
                }
            }
        ]
    },
    {
        path: '/pins/:id',
        name: 'pins',
        component: () => import('@/views/pins/index.vue')
    },
    {
        path: "/login",
        name: "login",
        component: () => import('@/views/login-register/login/index.vue')
    },
    {
        path: "/register",
        name: "register",
        component: () => import('@/views/login-register/register/index.vue')
    },
    {
        path: '/member',
        name: 'member',
        component: () => import('@/views/member/index.vue'),
        meta: {
            user: true // 是否需要鉴权
        }
    },
]
