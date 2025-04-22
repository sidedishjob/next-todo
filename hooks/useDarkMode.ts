'use client';

import useSWR, { mutate } from 'swr';
import { fetcher } from '@/lib/fetcher';
import { API_ROUTES } from '@/lib/apiRoutes';
import { post } from '@/lib/api';
import { useEffect } from 'react';
import { handleApiError } from '@/lib/handlers/handleApiError';

type ThemeValue = 'light' | 'dark';
type ThemeResponse = { theme: ThemeValue };

/**
 * ダークモード設定を管理するカスタムフック
 */
export default function useDarkMode(setError?: (msg: string) => void) {
	const { data, error, isLoading } = useSWR<ThemeResponse>(API_ROUTES.settings.theme, fetcher, {
		onError: (err) => handleApiError(err, setError),
	});
	const theme = data?.theme;
	const isDark = theme === 'dark';

	// ダークモードのトグル
	const toggleTheme = async () => {
		const newTheme: ThemeValue = isDark ? 'light' : 'dark';

		try {
			await post(API_ROUTES.settings.theme, { theme: newTheme });
			mutate(API_ROUTES.settings.theme);
		} catch (err) {
			handleApiError(err, setError);
		}
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
