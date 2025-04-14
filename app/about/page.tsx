export const metadata = { title: 'このアプリについて' };

// 完全に静的な内容のページ（SSG対象）
export default function AboutPage() {
	return (
		<div className="mx-auto max-w-xl bg-card dark:bg-card-dark shadow-lg rounded-lg sm:p-6 space-y-4 transition-colors duration-300">
			<h2 className="text-2xl font-bold mb-4 text-primary dark:text-blue-400 transition-colors duration-300">
				このアプリについて
			</h2>
			<p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
				このアプリは、ReactやNext.js、TypeScriptなどモダンなweb記述の学習を目的に<br />開発されています。
			</p>
		</div>
	);
};
