// commitlint.config.cjs
module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		// 限定type只能使用下面枚举值，2代表错误级别，不满足直接阻止提交
		'type-enum': [
			2,
			'always',
			[
				'feat', // 新增功能
				'fix', // 修复bug
				'docs', // 文档修改
				'style', // 代码格式修改，不改变业务逻辑
				'refactor', // 代码重构
				'perf', // 性能优化
				'test', // 新增/修改测试用例
				'chore', // 构建、工具、工程配置改动
				'revert', // 回滚提交
				'build', // 打包、依赖变更
			],
		],
		'type-case': [0], // type大小写不做强制校验
		'type-empty': [2, 'never'], // type不能为空（开启强制）
		'scope-empty': [0], // scope选填，可以为空
		'scope-case': [0], // scope大小写不强制
		'subject-full-stop': [0, 'never'], // subject结尾禁止加句号，关闭强制
		'subject-case': [0, 'never'], // subject大小写不强制
		'header-max-length': [2, 'always', 100], // 头部最大字符限制，放宽到100
	},
};
