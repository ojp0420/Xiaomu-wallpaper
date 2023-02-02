/*
    年/月/日/时/分：2022/6/12/14/05 -->
    IDE名称：WebStorm -->
    开发系统：Windows11 -->
    作者：JinPeng -->
*/

/**
 * 全局指令注册
 */
export default {
    async install(app) {
        // import.meta.globEager 为同步导入
        const directives = import.meta.globEager('./modules/*.js')
        for (const [key, value] of Object.entries(directives)) {
            // 拼接组件注册的 name
            const arr = key.split('/')
            const directiveName = arr[arr.length - 1].replace('.js', '')
            // 完成注册
            app.directive(directiveName, value.default)
        }
    }
}
