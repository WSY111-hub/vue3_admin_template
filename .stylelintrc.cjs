module.exports = {
	extends: [
		'stylelint-config-standard',
		'stylelint-config-standard-scss',
		'stylelint-config-recess-order', // css属性书写顺序
	],
	overrides: [
		{
			files: ['**/*.vue'],
			customSyntax: 'postcss-html',
		},
		{
			files: ['**/*.scss'],
			customSyntax: 'postcss-scss',
		},
	],
	rules: {
		// 允许空style标签
		'no-empty-source': null,

		// Vue3深度选择器 :deep() :global() :slotted()，伪类！单冒号
		'selector-pseudo-class-no-unknown': [
			true,
			{
				ignorePseudoClasses: ['deep', 'global', 'slotted'],
			},
		],

		// scss @mixin / @include 等规则放行
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: ['mixin', 'include', 'use', 'forward'],
			},
		],

		// 关闭选择器优先级校验，容易误报
		'no-descending-specificity': null,
	},
};
