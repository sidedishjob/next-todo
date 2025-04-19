export async function request<T>(url: string, options?: RequestInit): Promise<T> {
	const res = await fetch(url, {
		headers: { 'Content-Type': 'application/json' },
		...options,
	});

	if (!res.ok) {
		// 必要に応じて error logging や redirect 処理追加
		throw new Error(`API error: ${res.status}`);
	}

	return res.json();
}

// HTTPメソッドごとのラッパー関数
export const get = <T>(url: string) => request<T>(url);

export const post = <T>(url: string, body: unknown) =>
	request<T>(url, {
		method: 'POST',
		body: JSON.stringify(body),
	});

export const put = <T>(url: string, body: unknown) =>
	request<T>(url, {
		method: 'PUT',
		body: JSON.stringify(body),
	});

export const patch = <T>(url: string, body: unknown) =>
	request<T>(url, {
		method: 'PATCH',
		body: JSON.stringify(body),
	});

export const del = <T>(url: string) =>
	request<T>(url, {
		method: 'DELETE',
	});
