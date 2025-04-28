import { apiCaller } from './api/core/apiCaller';

export const fetcher = async <T>(url: string): Promise<T> => {
	const { data } = await apiCaller<T>('GET', url);
	return data;
};
