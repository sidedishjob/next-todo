import { apiClient } from '../client';
import { fetchClient } from '../client/fetch';
import { ApiClientType } from './types';

interface ApiCallerOptions {
	client?: ApiClientType;
}

export const apiCaller = async <T>(
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
	url: string,
	body?: unknown,
	options?: ApiCallerOptions,
): Promise<T> => {
	console.log('method : ' + method);
	console.log('url : ' + url);
	const clientType = options?.client || 'fetch'; // デフォルトはfetch
	const config: any = {
		method,
		url,
	};

	// POST, PUT, PATCH のみ body（data）を含める
	if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
		config.data = body;
	}

	if (clientType == 'axios') {
		console.log('axiosで通信開始');
		const response = await apiClient.request<T>(config);
		return response.data;
	} else {
		console.log('fetchで通信開始');
		return await fetchClient<T>(config);
	}
};
