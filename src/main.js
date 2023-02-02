import {createApp} from 'vue'
import App from './App.vue'
import './styles/index.scss'
import router from "./router";
import {useREM} from "./utils/flexible";
import changeTheme from "./utils/changeTheme"
import mLibs from './libs'
import mDirecttives from "./directives"
// 导入Vuex
import store from "./store";
//注册svg-icons
import 'virtual:svg-icons-register'
import "./permission"

useREM() // 根据屏幕的宽度设置字体的大小
changeTheme() // 改变系统样式
const app = createApp(App)
app.use(router)
app.use(mLibs)
app.use(store)
app.use(mDirecttives)


app.mount('#app')
