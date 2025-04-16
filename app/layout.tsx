import './globals.css';
import AppLayout from '@/layouts/AppLayout';

export const metadata = {
	title: {
		default: 'Todo App For Next',
		template: '%s - Todo App For Next',
	},
	description: 'React + Next.js の学習用Todoアプリ',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ja" suppressHydrationWarning>
			<body className="bg-white text-black dark:bg-zinc-900 dark:text-white transition-colors">
				<AppLayout>{children}</AppLayout>
			</body>
		</html>
	);
}
