import { ApiResponse } from '../core/types';

export const fetchClient = async <T>(config: {
	method: string;
	url: string;
	data?: unknown;
}): Promise<ApiResponse<T>> => {
	const response = await fetch(config.url, {
		method: config.method,
		headers: { 'Content-Type': 'application/json' },
		body: config.data ? JSON.stringify(config.data) : undefined,
	});

	if (!response.ok) {
		throw new Error(`Fetch failed with status ${response.status}`);
	}

	// レスポンスにボディがある場合のみjsonで返す
	if (response.status === 204) {
		return {
			data: null as unknown as T,
			status: response.status,
		};
	}

	const responseData = await response.json();

	return {
		data: responseData as T,
		status: response.status,
	};
};
