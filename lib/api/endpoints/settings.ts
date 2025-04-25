import { Setting } from '@/types/setting';
import { apiCaller } from '../core/apiCaller';
import { API_ROUTES } from '../routes';

/**
 * テーマを取得するAPI
 */
export const getTheme = async (): Promise<Setting> => {
	return await apiCaller<Setting>('GET', API_ROUTES.settings.theme);
};

/**
 * テーマを更新するAPI（成功したら true）
 */
export const updateTheme = async (theme: 'light' | 'dark'): Promise<void> => {
	return await apiCaller<void>('POST', API_ROUTES.settings.theme, {
		theme,
	});
};
