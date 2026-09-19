//路由鉴权，鉴权：项目当中路由能不能被访问的权限（某一个路由什么条件下可以访问，什么条件下不可以访问）
import router from '@/router';
//引入进度条样式
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
Nprogress.configure({ showSpinner: false });
//获取用户相关的小仓库内部token数据，去判断用户是否登陆成功
import pinia from './store';
import useUserStore from './store/modules/user';

import setting from './setting';
let userStore = useUserStore(pinia);

//全局守卫：项目当中任意路由切换都会触发的钩子
//全局前置守卫：访问某一个路由之前守卫
router.beforeEach(async (to: any, _from: any, next: any) => {
	document.title = `${setting.title}-${to.meta.title}`;
	//to:你将要访问哪个路由
	//from：你从哪个路由而来
	//next:路由的放行函数
	Nprogress.start();
	//获取token,去判断用户是否登录
	let token = userStore.token;
	//获取用户名字
	let username = userStore.username;
	//用户登陆判断
	if (token) {
		//登陆成功。访问login,不能访问，指向首页
		if (to.path === '/login') {
			next({ path: '/' });
		} else {
			//登陆成功，可以访问其余6个路由(登陆排除)
			//有用户信息
			if (username) {
				//放行
				//万一：刷新的时候是异步路由，有可能获取到用户信息，异步路由还没有加载完毕，出现空白的效果
				next({ ...to });
			} else {
				//如果没有用户信息，在守卫这里发请求获取到了用户信息在放行
				try {
					//获取用户信息
					await userStore.userInfo();
					next();
				} catch (error) {
					//token过期：获取不到用户信息了
					//用户手动修改本地存储token
					//退出登录->把用户相关数据清空
					userStore.userLogout();
					next({ path: '/login', query: { redirect: to.path } });
				}
			}
		}
	} else {
		//用户未登录判断
		if (to.path === '/login') {
			next();
		} else {
			next({ path: '/login', query: { redirect: to.path } });
		}
	}
});
//全局后置守卫
router.afterEach((_to: any, _from: any) => {
	Nprogress.done();
});

//第一个问题：任意路由切换实现进度条业务 --nprogress
//第二个问题：路由鉴权（路由组件访问权限的设置）
//全部路由组件：
// 一级路由：登陆|404|任意路由|数据大屏|权限管理|商品管理
//二级路由：首页（在layout下的二级路由）|（权限管理下的个3子路由）菜单管理，角色管理，用户管理|（商品管理下的4个子路由）品牌管理，属性管理，SPU管理，SKU管理

//用户未登录：可以访问login,其余6个路由（不算权限管理和商品管理下的子路由）不能访问，指向login
//用户登陆成功：不可以访问login[指向首页]，其余的路由可以访问
//判断是否登陆：token
