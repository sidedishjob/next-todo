module.exports = {
	root: true,
	extends: [
		'next/core-web-vitals',
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended', // ✅ Prettierとの連携
	],
	plugins: ['react', '@typescript-eslint', 'prettier'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	rules: {
		'prettier/prettier': [
			'error',
			{
				semi: true,
				singleQuote: true,
				useTabs: true,
				tabWidth: 4,
				trailingComma: 'all',
				printWidth: 100,
			},
		],
		'react/react-in-jsx-scope': 'off', // ✅ React 17以降では不要
	},
};
