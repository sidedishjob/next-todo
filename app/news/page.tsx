export const revalidate = 60;	// 60秒ごとに再生成される（ISR）

export const metadata = {
	title: 'お知らせ',
	description: 'アプリの最新情報やアップデート内容をお知らせします。開発の進捗やリリース内容をご確認いただけます。',
};

export default async function NewsPage() {
	// fetchで外部データ取得（cache: 'force-cache' は revalidateと併用）
	const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
		cache: 'force-cache',
	});
	const data = await res.json();

	return (
		<div className="mx-auto max-w-xl bg-card dark:bg-card-dark shadow-lg rounded-lg sm:p-6 space-y-4 transition-colors duration-300">
			<h2 className="text-2xl font-bold mb-4 text-primary dark:text-blue-400 transition-colors duration-300">
				最新のお知らせ
			</h2>
			<ul className="text-gray-600 dark:text-gray-400 transition-colors duration-300 space-y-2">
				{data.slice(0, 5).map((post: any) => (
					<li key={post.id} className="border-b pb-2">
						<p className="font-semibold">{post.title}</p>
					</li>
				))}
			</ul>
		</div>
	
	);
}