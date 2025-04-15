export default function Head() {
	return (
		<>
			<title>Todo App for React</title>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="theme-color" content="#000000" />
			<meta name="description" content="Web site created using Next.js" />

			{/* Favicon: 明暗テーマごとの設定 */}
			<link
				id="favicon"
				rel="icon"
				href="/favicon.svg"
				type="image/svg+xml"
				media="(prefers-color-scheme: light)"
			/>
			<link
				id="favicon-dark"
				rel="icon"
				href="/favicon.ico"
				type="image/x-icon"
				media="(prefers-color-scheme: dark)"
			/>

			{/* Apple Touch Icon */}
			<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

			{/* Web App Manifest（必要であれば） */}
			<link rel="manifest" href="/manifest.json" />
		</>
	);
}
