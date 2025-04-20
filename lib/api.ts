/**
 * 共通API処理モジュール
 */

/**
 * APIエラーの構造化クラス
 */
export class ApiError extends Error {
	status: number;

	constructor(message: string, status: number) {
		super(message);
		this.name = 'ApiError';
		this.status = status;
	}
}

export async function request<T>(url: string, options?: RequestInit): Promise<T> {
	try {
		const res = await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				...(options?.headers || {}),
			},
			...options,
		});

		// 通信が失敗した場合にエラーを投げる
		if (!res.ok) {
			const errorBody = await res.json().catch(() => ({}));
			const message = errorBody.message || res.statusText || 'API Error';
			throw new ApiError(message, res.status);
		}

		// レスポンスにボディがある場合のみjsonで返す
		if (res.status === 204) return {} as T;

		return res.json();
	} catch (err) {
		if (err instanceof ApiError) {
			throw err;
		} else {
			console.log('ネットワークエラー:', err);
			throw new ApiError('ネットワークエラーが発生しました', 0);
		}
	}
}

export const get = <T>(url: string): Promise<T> => request<T>(url);

export const post = <T>(url: string, body: unknown): Promise<T> =>
	request<T>(url, {
		method: 'POST',
		body: JSON.stringify(body),
	});

export const put = <T>(url: string, body: unknown): Promise<T> =>
	request<T>(url, {
		method: 'PUT',
		body: JSON.stringify(body),
	});

export const patch = <T>(url: string, body: unknown): Promise<T> =>
	request<T>(url, {
		method: 'PATCH',
		body: JSON.stringify(body),
	});

export const del = <T>(url: string): Promise<T> =>
	request<T>(url, {
		method: 'DELETE',
	});
