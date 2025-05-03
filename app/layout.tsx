import './globals.css';
import Providers from '@/components/Providers';
import AppLayout from '@/layouts/AppLayout';
import Head from './Head';
import { ErrorProvider } from '@/components/ErrorContext';

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
			<Head />
			<body className="bg-white text-black dark:bg-zinc-900 dark:text-white transition-colors">
				<Providers>
					<ErrorProvider>
						<AppLayout>{children}</AppLayout>
					</ErrorProvider>
				</Providers>
			</body>
		</html>
	);
}
