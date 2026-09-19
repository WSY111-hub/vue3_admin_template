<template>
	<div class="login_container">
		<el-row>
			<el-col :span="12" :xs="0"></el-col>
			<el-col :span="12" :xs="24">
				<!-- 登陆的表单 -->
				<el-form
					class="login_form"
					:model="loginForm"
					:rules="rules"
					ref="loginForms"
				>
					<h1>Hello</h1>
					<h2>欢迎来到硅谷甄选</h2>
					<el-form-item prop="username">
						<el-input
							:prefix-icon="User"
							v-model="loginForm.username"
						></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input
							type="password"
							:prefix-icon="Lock"
							v-model="loginForm.password"
							show-password
						></el-input>
					</el-form-item>
					<el-form-item>
						<el-button
							:loading="loading"
							class="login_btn"
							type="primary"
							size="default"
							@click="login"
						>
							登陆
						</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue';

import { reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElNotification } from 'element-plus';
//引入获取当前时间的函数
import { getTime } from '@/utils/time';
//引入用户相关的小仓库
import useUserStore from '@/store/modules/user';
let useStore = useUserStore();
//获取el-form组件
let loginForms = ref();
//获取路由器
let $router = useRouter();
//获取路由对象
let $route = useRoute();
//收集账号和密码的数据
let loginForm = reactive({ username: 'admin', password: '111111' });
//定义一个变量控制按钮加载的效果
let loading = ref(false);
//登陆按钮的回调
const login = async () => {
	//保证全部表单项校验通过再发请求
	try {
		// 表单校验失败会抛出异常，必须捕获
		await loginForms.value.validate();
	} catch (err) {
		// 表单校验不通过直接return，不请求登录接口
		return;
	}
	//加载效果：开始加载
	loading.value = true;
	//通知仓库发登录请求
	//请求成功：首页展示数据的地方
	//请求失败：弹出登陆失败的信息
	try {
		//保证登陆成功
		await useStore.userLogin(loginForm);
		//编程式导航跳转到展示数据首页
		//判断登录的时候，路由路径当中是否有query参数，如果有就往query参数跳转，没有跳转就到首页
		let redirect: any = $route.query.redirect;
		$router.push({ path: redirect || '/' });
		//登陆成功提示信息
		ElNotification({
			type: 'success',
			message: '欢迎回来',
			title: `HI,${getTime()}好`,
		});
		//登陆成功加载效果也消失
		loading.value = false;
	} catch (error) {
		//登陆失败：加载效果消失
		loading.value = false;
		//登陆失败提示信息
		ElNotification({
			type: 'error',
			message: (error as Error).message,
		});
	}
};
//自定义校验规则函数
const validatorUserName = (_rule: any, value: any, callback: any) => {
	//rule:即为校验规则对象
	//value:即为表单元素文本内容
	//callback:如果符合条件callback放行通过，不符合条件调用callback方法，注入错误的提示信息
	if (value.length >= 5) {
		callback();
	} else {
		callback(new Error('账号长度至少5位'));
	}
};

const validatorPassword = (_rule: any, value: any, callback: any) => {
	//rule:即为校验规则对象
	//value:即为表单元素文本内容
	//callback:如果符合条件callback放行通过，不符合条件调用callback方法，注入错误的提示信息
	if (value.length >= 6) {
		callback();
	} else {
		callback(new Error('密码长度至少6位'));
	}
};

//定义表单校验需要配置对象
const rules = {
	//规则对象属性：
	//required:这个字段务必要校验
	//min:文本长度至少多少位
	//max:文本长度至多多少位
	//message:错误的提示信息
	//trigger:触发校验表单的时机 change->文本发生变化触发校验，blur->失去焦点的时候触发校验规则
	username: [
		// {
		// 	required: true,
		// 	min: 6,
		// 	max: 10,
		// 	message: '账号长度至少6位',
		// 	trigger: 'change',
		// },
		{
			required: true,
			trigger: 'blur',
			validator: validatorUserName,
		},
	],
	password: [
		// {
		// 	required: true,
		// 	min: 6,
		// 	max: 15,
		// 	message: '密码长度至少6位',
		// 	trigger: 'change',
		// },
		{
			required: true,
			trigger: 'blur',
			validator: validatorPassword,
		},
	],
};
</script>

<style scoped lang="scss">
.login_container {
	width: 100%;
	height: 100vh;
	background: url('@/assets/images/background.jpg') no-repeat;
	background-size: cover;
	.login_form {
		position: relative;
		width: 80%;
		top: 30vh;
		background: url('@/assets/images/login_form.png') no-repeat;
		background-size: cover;
		padding: 40px;
		h1 {
			color: white;
			font-size: 40px;
		}
		h2 {
			font-size: 20px;
			color: white;
			margin: 20px 0;
		}
		.login_btn {
			width: 100%;
		}
	}
}
</style>
