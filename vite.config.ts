// https://vite.dev/config/
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
// 引入svg需要用到的插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';
//mock插件提供方法
import { viteMockServe } from 'vite-plugin-mock';

export default defineConfig(({ command, mode }) => {
	//获取各种环境下的对应的变量
	let env = loadEnv(mode, process.cwd());
	return {
		base: '/vue3_admin_template/',
		plugins: [
			vue(),
			// 配置svg图标插件
			createSvgIconsPlugin({
				iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
				symbolId: 'icon-[dir]-[name]',
			}),
			viteMockServe({
				//保证开发阶段使用mock接口
				// 3.x版本用 enable，不要写 localEnabled
				enable: command === 'serve',
				mockPath: 'mock',
				watchFiles: true,
				logger: true,
			}),
		],
		resolve: {
			alias: {
				'@': path.resolve('./src'), //相对路径别名配置，使用@代替src
			},
		},
		//sass全局变量的配置
		css: {
			preprocessorOptions: {
				scss: {
					// 使用现代的 @use 语法代替 @import
					additionalData: `@use "@/assets/styles/variables.scss" as *;`,
				},
			},
		},
		// 预构建优化，解决启动慢
		optimizeDeps: {
			include: [
				'vue',
				'vue-router',
				'pinia',
				'element-plus',
				'@element-plus/icons-vue',
				'axios',
				'dayjs',
				'echarts',
				'echarts-liquidfill',
			],
		},
		//代理跨域
		server: {
			host: '127.0.0.1',
			// 忽略不需要监听的目录，提升Windows性能
			watch: {
				ignored: ['**/node_modules/**', '**/.git/**'],
			},
			proxy: {
				[env.VITE_APP_BASE_API]: {
					//获取数据的服务器地址设置
					target: env.VITE_SERVE,
					//需要代理跨域
					changeOrigin: true,
					//路径重写
					rewrite: (path) => path.replace(/^\/api/, ''),
				},
			},
		},
	};
});
