'use client';

import useSWR, { mutate } from 'swr';
import { fetcher } from '@/lib/fetcher';
import { API_ROUTES } from '@/lib/apiRoutes';
import { useEffect } from 'react';

type ThemeValue = 'light' | 'dark';
type ThemeResponse = { theme: ThemeValue };

/**
 * ダークモード設定を管理するカスタムフック
 */
export default function useDarkMode() {
	const { data, error, isLoading } = useSWR<ThemeResponse>(API_ROUTES.settings.theme, fetcher);
	const theme = data?.theme;
	const isDark = theme === 'dark';

	// ダークモードのトグル
	const toggleTheme = async () => {
		const newTheme: ThemeValue = isDark ? 'light' : 'dark';

		await fetch(API_ROUTES.settings.theme, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ theme: newTheme }),
		});
		mutate(API_ROUTES.settings.theme);
	};

	useEffect(() => {
		if (!theme) return;

		const root = document.documentElement;
		if (theme === 'dark') {
			root.classList.add('dark');
		} else {
			root.classList.remove('dark');
		}
	}, [theme]);

	return { theme, isDark, isLoading, error, toggleTheme };
}
