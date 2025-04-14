import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata = {
	title: 'Todo App For Next',
	description: 'React + Next.js の学習用Todoアプリ',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ja" suppressHydrationWarning>
			<body className="bg-white text-black dark:bg-zinc-900 dark:text-white transition-colors">
				<ThemeProvider>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
