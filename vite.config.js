import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path, {join} from 'path'
import {createSvgIconsPlugin} from "vite-plugin-svg-icons";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        createSvgIconsPlugin({
            // 指定需要缓存的图标文件夹
            iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
            // 指定symbolId格式
            symbolId: 'icon-[name]'
        })
    ],
    //使@符号 指向src文件夹路径 软链接
    resolve: {
        alias: {
            '@': join(__dirname, '/src')
        }
    },
    //代理配置
    server: {
        proxy: {
            //    代理所有/api 的请求
            '/api': {
                target: 'https://api.imooc-front.lgdsunday.club/',
                //    跨域
                changeOrigin: true,
            }
        }
    }
})
