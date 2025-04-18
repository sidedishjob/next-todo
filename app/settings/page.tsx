export const metadata = {
	title: '設定',
	description: 'テーマの切り替えや表示モードの調整など、アプリの見た目をカスタマイズできます。',
};

export default function Settings() {
	return (
		<div className="mx-auto max-w-xl bg-card dark:bg-card-dark shadow-lg rounded-lg sm:p-6 space-y-4 transition-colors duration-300">
			<h2 className="text-2xl font-bold mb-4 text-primary dark:text-blue-400 transition-colors duration-300">
				設定ページ
			</h2>
			<p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
				ここでテーマや表示設定などをカスタマイズできます。
			</p>
		</div>
	);
}
