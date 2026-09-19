<template>
	<template v-for="(item, _index) in menuList" :key="item.path">
		<template v-if="!item.children">
			<!-- 没有子路由 -->
			<el-menu-item
				v-if="!item.meta.hidden"
				:index="item.path"
				@click="goRoute"
			>
				<el-icon>
					<component :is="item.meta.icon"></component>
				</el-icon>
				<template #title>
					<span>{{ item.meta.title }}</span>
				</template>
			</el-menu-item>
		</template>

		<!-- 有子路由但个数只有一个 -->
		<template v-if="item.children && item.children.length === 1">
			<el-menu-item
				v-if="!item.children[0].meta.hidden"
				:index="item.children[0].path"
				@click="goRoute"
			>
				<el-icon>
					<component :is="item.children[0].meta.icon"></component>
				</el-icon>
				<template #title>
					<span>{{ item.children[0].meta.title }}</span>
				</template>
			</el-menu-item>
		</template>

		<!-- 有子路由但个数>1个 -->
		<el-sub-menu
			v-if="item.children && item.children.length > 1"
			:index="item.path"
		>
			<template #title>
				<el-icon>
					<component :is="item.meta.icon"></component>
				</el-icon>
				<span>{{ item.meta.title }}</span>
			</template>
			<!-- 递归组件 -->
			<Menu :menuList="item.children"></Menu>
		</el-sub-menu>
	</template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
//获取父组件传递过来的全部路由数据
defineProps(['menuList']);

//获取路由器对象
let $router = useRouter();
//点击菜单的回调
const goRoute = (vc: any) => {
	//路由跳转
	$router.push(vc.index);
};
</script>

<script lang="ts">
export default {
	name: 'Menu',
};
</script>
<style scoped></style>
