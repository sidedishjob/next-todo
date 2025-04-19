/**
 * 共通API処理モジュール
 */

export async function request<T>(url: string, options?: RequestInit): Promise<T> {
	const res = await fetch(url, {
		headers: {
			'Content-Type': 'application/json',
			...(options?.headers || {}),
		},
		...options,
	});

	// 通信が失敗した場合にエラーを投げる
	if (!res.ok) {
		throw new Error(`API Error: ${res.status}`);
	}

	// レスポンスにボディがある場合のみjsonで返す
	if (res.status === 204) return {} as T;

	return res.json();
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
