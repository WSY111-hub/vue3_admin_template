<template>
	<div class="box">
		<div class="container">
			<!-- 左侧404插图 -->
			<div class="img-wrap">
				<div class="bg-404"></div>
			</div>
			<!-- 右侧文字+按钮区域 -->
			<div class="right-content">
				<h1>你访问的界面不存在！</h1>
				<h3>管理员说你不能进入此页面</h3>
				<span>请检查你的url是否正确，或点击下面按钮回到首页</span>
				<el-button class="back-btn" type="primary" @click="goHome">
					返回到首页
				</el-button>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup name="Page404">
import { useRouter } from 'vue-router';
const $router = useRouter();
const goHome = () => {
	$router.push('/home');
};
</script>

<style scoped lang="scss">
.box {
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
}
.container {
	display: flex;
	align-items: center;
	gap: 60px;
	max-width: 1200px;
	padding: 20px;
}
.img-wrap {
	flex-shrink: 0;
	width: 520px;
	height: 420px;
}
.bg-404 {
	width: 100%;
	height: 100%;
	background: url(../../assets/images/error_images/404.png) no-repeat center;
	background-size: contain;
}
.right-content {
	// 上浮动画
	animation: floatIn 0.8s ease-out forwards;
	// 初始状态：透明，向下偏移20px
	opacity: 0;
	transform: translateY(20px);
	h1 {
		color: #0088ee;
		font-size: 46px;
		margin: 0 0 14px 0;
	}
	h3 {
		color: #333;
		font-size: 24px;
		font-weight: normal;
		margin: 0 0 10px 0;
	}
	span {
		color: #666;
		font-size: 16px;
		display: block;
		margin-bottom: 24px;
	}
}
.back-btn {
	width: 145px;
	height: 44px;
}
// 上浮关键帧动画
@keyframes floatIn {
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

// 小屏幕适配
@media (max-width: 900px) {
	.container {
		flex-direction: column;
		text-align: center;
	}
}
</style>
