<template>
	<!-- 🌷可以调宽高,别忘了这种很巧妙的对象传多值写法！！！ -->
	<svg :style="{ width, height }">
		<!-- 要用`xxx.svg`就写成`#icon-xxx`（插件的作用） -->
		<use :xlink:href="`${prefix}${name}`" :fill="color" />
	</svg>
</template>

<script setup lang="ts">
//接受父组件传递过来的参数
defineProps({
	// xlink:href属性值的前缀
	prefix: {
		type: String,
		default: '#icon-',
	},
	// 图标名称
	name: {
		type: String,
		default: '',
	},
	// 图标颜色
	color: {
		type: String,
		default: '',
	},
	width: {
		type: String,
		default: '16px',
	},
	height: {
		type: String,
		default: '16px',
	},
});
</script>

<style></style>
