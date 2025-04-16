'use client';

import { ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
	FiHome,
	FiArrowLeft,
	FiSettings,
	FiBook,
	FiTrello,
	FiGrid,
	FiSun,
	FiMoon,
	FiXCircle,
} from 'react-icons/fi';
import { cn } from '@/lib/utils';
import useDarkMode from '@/hooks/useDarkMode';

interface AppLayoutProps {
	children: ReactNode;
}

const getPageTitle = (pathname: string) => {
	if (pathname === '/') return 'Todo App for Next';
	if (pathname.startsWith('/todo/')) return 'Todo の詳細';
	if (pathname === '/settings') return '設定';
	if (pathname === '/about') return 'アプリについて';
	if (pathname === '/news') return 'お知らせ';
	if (pathname === '/api-test') return 'APIテスト';
	if (pathname === '/todos-methods') return '学習トップページ';
	return 'ページ';
};

// ナビゲーションメニュー定義（データ駆動化）
const navItems = [
	{ href: '/', icon: FiHome, label: 'ホーム' },
	{ href: '/settings', icon: FiSettings, label: '設定' },
	{ href: '/about', icon: FiBook, label: 'アプリについて' },
	{ href: '/news', icon: FiTrello, label: 'お知らせ' },
	{
		href: '/api-test',
		icon: FiXCircle,
		label: 'APIテスト',
		extraClass: 'text-red-400 hover:text-red-700',
	},
	{ href: '/todos-methods', icon: FiGrid, label: '学習トップページ' },
];

export default function AppLayout({ children }: AppLayoutProps) {
	const { isDark, toggleTheme } = useDarkMode();
	const router = useRouter();
	const pathname = usePathname();

	const pageTitle = getPageTitle(pathname);
	const isHome = pathname === '/';
	const isActive = (path: string) => pathname === path;

	return (
		<div className="in-h-screen">
			{/* ナビゲーションバー */}
			<header className="bg-card dark:bg-card-dark shadow p-4 flex justify-between items-center transition-colors duration-300">
				{/* 左側ナビ：戻る / ホーム / 設定 / アプリについて / ニュース */}
				<div className="flex items-center gap-4">
					{/* 戻る（ホーム以外） */}
					{!isHome && (
						<button
							onClick={() => router.back()}
							className="text-gray-400 hover:text-gray-700"
							aria-label="戻る"
						>
							<FiArrowLeft className="w-5 h-5" />
						</button>
					)}

					{/* 各ナビゲーションボタン */}
					{navItems.map(({ href, icon: Icon, label, extraClass }) => (
						<button
							key={href}
							onClick={() => router.push(href)}
							aria-label={label}
							className={cn(
								!isActive(href) &&
									(extraClass ?? 'text-gray-400 hover:text-gray-700'),
								isActive(href) && 'text-blue-600 font-bold',
							)}
						>
							<Icon className="w-5 h-5" />
						</button>
					))}
					{/* ダークモード切り替え */}
					<button
						onClick={toggleTheme}
						className="text-gray-400 dark:text-yellow-500"
						aria-label="ダークモード切り替え"
					>
						{isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
					</button>
				</div>

				{/* 現在のページ名 */}
				<h1 className="text-lg font-semibold text-gray-700 dark:text-gray-100 transition-colors duration-300">
					{pageTitle}
				</h1>
			</header>

			{/* ページごとの中身 */}
			<main className="p-4 sm:p-6 md:p-8">{children}</main>
		</div>
	);
}
