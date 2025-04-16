import Link from 'next/link';

export const metadata = {
	title: '学習トップページ',
	description: '学習内容に応じたページへのリンク集です。',
};

// ナビゲーションメニュー定義（データ駆動化）
const navItems = [
	{ href: '/todos-fetch', label: 'fetch' },
	{ href: '/todos-axios', label: 'axios' },
	{ href: '/todos-rq', label: 'React Query' },
];

export default function Settings() {
	return (
		<div className="mx-auto max-w-xl bg-card dark:bg-card-dark shadow-lg rounded-lg sm:p-6 space-y-4 transition-colors duration-300">
			<h2 className="text-2xl font-bold mb-4 text-primary dark:text-blue-400 transition-colors duration-300">
				学習トップページ
			</h2>
			{/* 各ナビゲーションボタン */}
			<ol>
				{navItems.map(({ href, label }) => (
					<li key={href}>
						<Link
							href={href}
							aria-label={label}
							className="text-gray-400 hover:text-gray-700"
						>
							{label}
						</Link>
					</li>
				))}
			</ol>
		</div>
	);
}
